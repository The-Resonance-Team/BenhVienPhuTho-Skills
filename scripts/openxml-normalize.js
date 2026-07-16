"use strict";

// Normalize only conversion defects that are safe to repair mechanically.
// Do not reorder Word property children: that can change document structure.

function repairTruncatedXml(xml) {
  const incompleteTag = xml.match(/<w:[A-Za-z0-9]+(?:\s[^<>]*)?$/u);
  if (!incompleteTag) return xml;
  const suffix = incompleteTag[0];
  const completion = /\s$/u.test(suffix) ? 'w:val="nil" />' : /=\s*$/u.test(suffix) ? '"nil" />' : ' />';
  const repaired = `${xml}${completion}`;
  const stack = [];
  for (const match of repaired.matchAll(/<\/?([A-Za-z0-9_:]+)(?:\s[^>]*)?\/?\s*>/gu)) {
    const token = match[0];
    const name = match[1];
    if (/^<\//u.test(token)) {
      if (stack.length) stack.pop();
    } else if (!/\/\s*>$/u.test(token) && !/^<\?|^<!/u.test(token)) {
      stack.push(name);
    }
  }
  return repaired + stack.reverse().map((name) => `</${name}>`).join("");
}

function dedupeVmlIds(xml) {
  const seen = new Map();
  return xml.replace(/<([A-Za-z_][\w.-]*):(shape|line|rect|oval|roundrect|group|shapetype)\b([^>]*\bid=")([^"]+)("[^>]*>)/gu, (full, prefix, localName, beforeId, id, afterId) => {
    const count = (seen.get(id) || 0) + 1;
    seen.set(id, count);
    if (count === 1) return full;
    return `<${prefix}:${localName}${beforeId}${id}_${count}${afterId}`;
  });
}

const RPR_ORDER = [
  "rStyle", "rFonts", "b", "bCs", "i", "iCs", "caps", "smallCaps", "strike", "dstrike",
  "outline", "shadow", "emboss", "imprint", "noProof", "snapToGrid", "vanish", "webHidden",
  "color", "spacing", "w", "kern", "position", "sz", "szCs", "highlight", "u", "effect",
  "bdr", "shd", "fitText", "vertAlign", "rtl", "cs", "em", "lang", "eastAsianLayout",
  "specVanish", "oMath", "rPrChange",
];

const PPR_ORDER = [
  "pStyle", "keepNext", "keepLines", "pageBreakBefore", "framePr", "widowControl", "numPr",
  "suppressLineNumbers", "pBdr", "shd", "tabs", "suppressAutoHyphens", "kinsoku", "wordWrap",
  "overflowPunct", "topLinePunct", "autoSpaceDE", "autoSpaceDN", "bidi", "adjustRightInd",
  "snapToGrid", "spacing", "ind", "contextualSpacing", "mirrorIndents", "suppressOverlap", "jc",
  "textDirection", "textAlignment", "textboxTightWrap", "outlineLvl", "divId", "cnfStyle", "rPr",
  "ins", "del", "moveFrom", "moveTo", "trackChange",
];

function directChildren(xml) {
  const tagPattern = /<([^!?][^<>]*)>/gu;
  const children = [];
  let depth = 0;
  let childStart = 0;
  let childName = "";
  for (const match of xml.matchAll(tagPattern)) {
    const token = match[0];
    const body = match[1].trim();
    const start = match.index;
    const end = start + token.length;
    const closing = body.startsWith("/");
    const selfClosing = /\/\s*$/u.test(body);
    const nameMatch = body.match(/^\/?([A-Za-z_][\w:.-]*)/u);
    if (!nameMatch) continue;
    const name = nameMatch[1].split(":").pop();
    if (closing) {
      depth -= 1;
      if (depth === 0 && childStart) {
        children.push({ name: childName, start: childStart, end });
        childStart = 0;
      }
    } else if (depth === 0) {
      childStart = start;
      childName = name;
      if (selfClosing) {
        children.push({ name, start, end });
        childStart = 0;
      } else {
        depth = 1;
      }
    } else if (!selfClosing) {
      depth += 1;
    }
  }
  return children;
}

function reorderDirectChildren(xml, parentLocalName, order) {
  const tagPattern = /<([^!?][^<>]*)>/gu;
  const stack = [];
  const ranges = [];
  for (const match of xml.matchAll(tagPattern)) {
    const token = match[0];
    const body = match[1].trim();
    const start = match.index;
    const end = start + token.length;
    const closing = body.startsWith("/");
    const selfClosing = /\/\s*$/u.test(body);
    const nameMatch = body.match(/^\/?([A-Za-z_][\w:.-]*)/u);
    if (!nameMatch) continue;
    const qualifiedName = nameMatch[1];
    const localName = qualifiedName.split(":").pop();
    if (closing) {
      const parent = stack.pop();
      if (parent && parent.localName === parentLocalName) ranges.push({ ...parent, closeStart: start, closeEnd: end });
    } else if (!selfClosing) {
      stack.push({ qualifiedName, localName, start, openEnd: end });
    }
  }
  const rank = new Map(order.map((name, index) => [name, index]));
  for (const range of ranges.reverse()) {
    const body = xml.slice(range.openEnd, range.closeStart);
    const children = directChildren(body);
    if (children.length < 2) continue;
    const sorted = [...children].sort((left, right) => {
      const leftRank = rank.has(left.name) ? rank.get(left.name) : order.length;
      const rightRank = rank.has(right.name) ? rank.get(right.name) : order.length;
      return leftRank - rightRank;
    });
    if (sorted.every((child, index) => child === children[index])) continue;
    const reordered = sorted.map((child) => body.slice(child.start, child.end)).join("");
    xml = `${xml.slice(0, range.openEnd)}${reordered}${xml.slice(range.closeStart)}`;
  }
  return xml;
}

function mergeDuplicateDirectChildren(xml, parentLocalName, childLocalName) {
  const tagPattern = /<([^!?][^<>]*)>/gu;
  const stack = [];
  const ranges = [];
  for (const match of xml.matchAll(tagPattern)) {
    const token = match[0];
    const body = match[1].trim();
    const closing = body.startsWith("/");
    const selfClosing = /\/\s*$/u.test(body);
    const nameMatch = body.match(/^\/?([A-Za-z_][\w:.-]*)/u);
    if (!nameMatch) continue;
    const localName = nameMatch[1].split(":").pop();
    if (closing) {
      const parent = stack.pop();
      if (parent && parent.localName === parentLocalName) ranges.push({ ...parent, closeStart: match.index });
    } else if (!selfClosing) {
      stack.push({ localName, openEnd: match.index + token.length });
    }
  }
  for (const range of ranges.reverse()) {
    const body = xml.slice(range.openEnd, range.closeStart);
    const children = directChildren(body);
    const matches = children.filter((child) => child.name === childLocalName);
    if (matches.length < 2) continue;
    const merged = `<w:${childLocalName}>${matches.map((child) => {
      const block = body.slice(child.start, child.end);
      const openEnd = block.indexOf(">") + 1;
      const closeStart = block.lastIndexOf(`</w:${childLocalName}>`);
      return closeStart > openEnd ? block.slice(openEnd, closeStart) : "";
    }).join("")}</w:${childLocalName}>`;
    let rebuilt = "";
    let inserted = false;
    for (const child of children) {
      if (child.name !== childLocalName) {
        rebuilt += body.slice(child.start, child.end);
      } else if (!inserted) {
        rebuilt += merged;
        inserted = true;
      }
    }
    xml = `${xml.slice(0, range.openEnd)}${rebuilt}${xml.slice(range.closeStart)}`;
  }
  return xml;
}

function normalizeOpenXml(xml) {
  let normalized = mergeDuplicateDirectChildren(dedupeVmlIds(repairTruncatedXml(xml)), "p", "pPr");
  normalized = reorderDirectChildren(normalized, "p", ["pPr"]);
  normalized = reorderDirectChildren(reorderDirectChildren(normalized, "rPr", RPR_ORDER), "pPr", PPR_ORDER)
    .replace(/<\/?w:sz-cs\b/gu, (tag) => tag.replace("sz-cs", "szCs"))
    .replace(/\bw:first-line=/gu, "w:firstLine=")
    // OfficeCLI may rewrite namespace prefixes (for example mc -> ns1) while
    // preserving the local attribute name. These metadata attributes are
    // optional compatibility/drawing identifiers and safe to remove from the
    // runtime copy.
    .replace(/\s+[A-Za-z_][\w.-]*:Ignorable="[^"]*"/gu, "")
    .replace(/\s+[A-Za-z_][\w.-]*:anchorId="[^"]*"/gu, "")
    .replace(/\s+[A-Za-z_][\w.-]*:restartNumberingAfterBreak="[^"]*"/gu, "")
    // Word exports fallback font lists separated by semicolons, but the
    // WordprocessingML font attributes accept one family name. Keep the
    // primary family and discard the legacy fallback suffix.
    .replace(/\b((?:w:)?(?:ascii|hAnsi|cs|eastAsia))="([^";]+);[^"]*"/gu, '$1="$2"')
    // The runtime documents are Vietnamese LTR forms. In this corpus, the
    // legacy logical-start value is equivalent to left alignment and is not
    // accepted by OfficeCLI's WordprocessingML schema.
    .replace(/(<w:(?:jc|lvlJc)\b[^>]*\bw:val=")(start|end)(")/gu, (_, prefix, value, suffix) => `${prefix}${value === "start" ? "left" : "right"}${suffix}`)
    .replace(/<[A-Za-z_][\w:.-]*:shadow\b[^>]*>[\s\S]*?<\/[A-Za-z_][\w:.-]*:shadow>/gu, "")
    .replace(/<[A-Za-z_][\w:.-]*:glow\b[^>]*>[\s\S]*?<\/[A-Za-z_][\w:.-]*:glow>/gu, "")
    .replace(/<[A-Za-z_][\w:.-]*:scene3d\b[^>]*>[\s\S]*?<\/[A-Za-z_][\w:.-]*:scene3d>/gu, "")
    .replace(/<[A-Za-z_][\w:.-]*:(?:shadow|ligatures|glow|reflection|props3d|numForm|numSpacing)\b[^>]*\/\s*>/gu, "")
    .replace(/<w:cs\b[^>]*\/\s*>/gu, "")
    .replace(/\bw:firstLine="-(\d+)"/gu, 'w:hanging="$1"')
    .replace(/<w:tblHeader\b[^>]*\bw:val="true"[^>]*\/\s*>/gu, "<w:tblHeader />")
    .replace(/<w:footnotePr\b[^>]*>[\s\S]*?<\/w:footnotePr>/gu, "")
    .replace(/<w:endnotePr\b[^>]*>[\s\S]*?<\/w:endnotePr>/gu, "")
    .replace(/\s+w16cid:durableId="[^"]*"/gu, "")
    .replace(/<w:charset\b[^>]*\/\s*>/gu, "");

  const requiresWps = /\bRequires="(?:[^" ]*\s+)*wps(?:\s+[^" ]*)*"/u.test(normalized);
  const requiresWpg = /\bRequires="(?:[^" ]*\s+)*wpg(?:\s+[^" ]*)*"/u.test(normalized);
  if ((requiresWps || requiresWpg) && !/\bxmlns:wps="/u.test(normalized) && !/\bxmlns:wpg="/u.test(normalized)) {
    normalized = normalized.replace(/(<[A-Za-z_][\w.-]*:document\b[^>]*)(>)/u, (_, start, end) => {
      const declarations = [
        requiresWps ? ' xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"' : "",
        requiresWpg ? ' xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"' : "",
      ].join("");
      return `${start}${declarations}${end}`;
    });
  }
  const cidNamespace = "http://schemas.microsoft.com/office/word/2016/wordml/cid";
  if (/\bw16cid:/u.test(normalized) && !/\bxmlns:w16cid="/u.test(normalized)) {
    normalized = normalized.replace(/<([A-Za-z_][\w:.-]*)(\b[^>]*>)/u, (_, name, attributes) => `<${name}${attributes.slice(0, -1)} xmlns:w16cid="${cidNamespace}">`);
  }
  let commentId = 0;
  normalized = normalized.replace(/<w16cid:commentId\b([^>]*)\/\s*>/gu, (full, attributes) => {
    if (/\bw16cid:durableId="/u.test(attributes)) return full;
    const value = attributes.match(/\bw16cid:paraId="([A-Fa-f0-9]+)"/u)?.[1] || String(++commentId).padStart(8, "0");
    return `<w16cid:commentId${attributes} w16cid:durableId="${value}"/>`;
  });
  normalized = normalized.replace(/<w16cex:commentExtensible\b([^>]*)\/\s*>/gu, (full, attributes) => {
    if (/\bw16cex:durableId="/u.test(attributes)) return full;
    const value = String(++commentId).padStart(8, "0");
    return `<w16cex:commentExtensible${attributes} w16cex:durableId="${value}"/>`;
  });
  normalized = normalized.replace(/(<w:numbering\b[^>]*?)\s+xmlns:w16cid="[^"]*"/u, "$1");
  return normalized;
}

module.exports = { normalizeOpenXml };
