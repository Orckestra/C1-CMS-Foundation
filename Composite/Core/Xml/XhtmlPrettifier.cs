using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;


namespace Composite.Core.Xml
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class XhtmlPrettifier
    {
        private static string _ampersandWord = "C1AMPERSAND";
        private static readonly Regex _encodeCDataRegex = new Regex(@"<!\[CDATA\[((?:[^]]|\](?!\]>))*)\]\]>", RegexOptions.Compiled);
        private static readonly Regex _decodeCDataRegex = new Regex("C1CDATAREPLACE(?<counter>[0-9]*)", RegexOptions.Compiled);
        private static readonly Regex _encodeRegex = new Regex(@"&(?<tag>[^\;]+;)", RegexOptions.Compiled);
        private static readonly Regex _decodeRegex = new Regex(@"C1AMPERSAND(?<tag>[^\;]+;)", RegexOptions.Compiled);

        private static readonly char[] IncorrectEscapeSequenceCharacters = { '\'', '\"', '<', '>', ' ' };
        

        private static readonly char[] WhitespaceChars = { '\t', '\n', '\v', '\f', '\r', ' ', '\x0085', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '​', '\u2028', '\u2029', '　', '﻿' };
        private static readonly HashSet<char> WhitespaceCharsLookup = new HashSet<char>(WhitespaceChars);

        private static readonly HashSet<NamespaceName> CompactElements = new HashSet<NamespaceName>(new []
        {
            new NamespaceName { Name = "title", Namespace = "" }
        });

        private static readonly HashSet<NamespaceName> AlwaysWrapElements = new HashSet<NamespaceName>(new[]
        {
            new NamespaceName { Name = "html", Namespace = "" },
            new NamespaceName { Name = "head", Namespace = "" },
            new NamespaceName { Name = "body", Namespace = "" }
        });

        internal static readonly HashSet<NamespaceName> InlineElements = new HashSet<NamespaceName>(new []
        {
            new NamespaceName { Name = "a", Namespace = "" }, 
            new NamespaceName { Name = "abbr", Namespace = "" }, 
            new NamespaceName { Name = "acronym", Namespace = "" }, 
            new NamespaceName { Name = "b", Namespace = "" }, 
            new NamespaceName { Name = "basefont", Namespace = "" }, 
            new NamespaceName { Name = "bdo", Namespace = "" }, 
            new NamespaceName { Name = "big", Namespace = "" }, 
            new NamespaceName { Name = "br", Namespace = "" }, 
            new NamespaceName { Name = "cite", Namespace = "" }, 
            new NamespaceName { Name = "code", Namespace = "" }, 
            new NamespaceName { Name = "dfn", Namespace = "" }, 
            new NamespaceName { Name = "em", Namespace = "" }, 
            new NamespaceName { Name = "fieldreference", Namespace = Namespaces.DynamicData10.NamespaceName },
            new NamespaceName { Name = "font", Namespace = "" }, 
            new NamespaceName { Name = "i", Namespace = "" }, 
            new NamespaceName { Name = "img", Namespace = "" }, 
            new NamespaceName { Name = "input", Namespace = "" }, 
            new NamespaceName { Name = "kbd", Namespace = "" }, 
            new NamespaceName { Name = "label", Namespace = "" },
            new NamespaceName { Name = "mark", Namespace = "" },
            new NamespaceName { Name = "page.description", Namespace = Namespaces.Rendering10.NamespaceName },
            new NamespaceName { Name = "page.title", Namespace = Namespaces.Rendering10.NamespaceName },
            new NamespaceName { Name = "q", Namespace = "" }, 
            new NamespaceName { Name = "s", Namespace = "" }, 
            new NamespaceName { Name = "samp", Namespace = "" }, 
            new NamespaceName { Name = "select", Namespace = "" }, 
            new NamespaceName { Name = "small", Namespace = "" }, 
            new NamespaceName { Name = "span", Namespace = "" }, 
            new NamespaceName { Name = "strike", Namespace = "" }, 
            new NamespaceName { Name = "strong", Namespace = "" }, 
            new NamespaceName { Name = "sub", Namespace = "" }, 
            new NamespaceName { Name = "sup", Namespace = "" }, 
            new NamespaceName { Name = "textarea", Namespace = "" }, 
            new NamespaceName { Name = "tt", Namespace = "" }, 
            new NamespaceName { Name = "u", Namespace = "" }, 
            new NamespaceName { Name = "var", Namespace = "" },
        });



        private static readonly HashSet<NamespaceName> WhitespaceAwareElements = new HashSet<NamespaceName>(new[]
            {
                new NamespaceName { Name = "style", Namespace = "" }, 
                new NamespaceName { Name = "script", Namespace = "" }, 
                new NamespaceName { Name = "pre", Namespace = "" }, 
                new NamespaceName { Name = "textarea", Namespace = "" },
                new NamespaceName { Name = "variable", Namespace = "http://www.w3.org/1999/xsl/transform" }
            });



        private static readonly HashSet<NamespaceName> SelfClosingElements = new HashSet<NamespaceName>(new []
            {
                new NamespaceName { Name = "br", Namespace = "" }, 
                new NamespaceName { Name = "hr", Namespace = "" }, 
                new NamespaceName { Name = "input", Namespace = "" }, 
                new NamespaceName { Name = "frame", Namespace = "" }, 
                new NamespaceName { Name = "img", Namespace = "" }, 
                new NamespaceName { Name = "area", Namespace = "" }, 
                new NamespaceName { Name = "meta", Namespace = "" }, 
                new NamespaceName { Name = "link", Namespace = "" }, 
                new NamespaceName { Name = "col", Namespace = "" }, 
                new NamespaceName { Name = "base", Namespace = "" }, 
                new NamespaceName { Name = "basefont", Namespace = "" }, 
                new NamespaceName { Name = "param", Namespace = "" }
            });



        /// <exclude />
        public static string Prettify(string xmlString)
        {
            return Prettify(xmlString, "\t");
        }



        /// <exclude />
        public static string Prettify(string xmlString, string indentString)
        {
            xmlString = XmlUtils.RemoveXmlDeclaration(xmlString);
            CDataMatchHandler cdataMatchHandler;

            IEnumerable<XmlNode> tree = BuildTree(xmlString, out cdataMatchHandler);

            var sb = new StringBuilder();
            NodeTreeToString(tree, sb, indentString, false);

            string result = sb.ToString();

            result = _decodeCDataRegex.Replace(result, cdataMatchHandler.Decode);

            return result;
        }


        private static void NodeTreeToString(IEnumerable<XmlNode> nodes, StringBuilder stringBuilder, string indentString, bool keepWhiteSpaces)
        {
            foreach (XmlNode node in nodes)
            {
                if (node.NodeType == XmlNodeType.Element)
                {
                    if (!keepWhiteSpaces
                        && (node.IsBlockElement() 
                            || node.ContainsBlockElements 
                            || (node.ParentNode != null && node.ParentNode.ContainsBlockElements)) 
                        && (node.Level > 0))
                    {
                        stringBuilder.AppendLine().AddIndent(node.Level, indentString);
                    }

                    stringBuilder.Append("<").Append(node.Name);
                    foreach (XmlAttribute attribute in node.Attributes)
                    {
                        if (!attribute.Name.StartsWith("xmlns", StringComparison.OrdinalIgnoreCase) 
                            || node.ParentNode == null 
                            || node.ParentNode.NamespaceByPrefix(attribute.Name) != node.NamespaceURI)
                        {
                            stringBuilder.Append(" ").Append(attribute.Name).Append("=\"").Append(EncodeAttributeString(attribute.Value)).Append("\"");
                        }
                    }

                    bool isSelfClosingAndEmpty = node.IsSelfClosingElement() &&
                                                 !node.IsAlwaysWrapElement() &&
                                                 (node.IsEmpty 
                                                  || !node.ChildNodes.Any(f => f.NodeType == XmlNodeType.Element || f.NodeType == XmlNodeType.Text));

                    stringBuilder.Append(isSelfClosingAndEmpty ? " />" : ">");

                    bool nodeIsWhiteSpaceAware = node.IsWhitespaceAware();

                    // Recursive call
                    NodeTreeToString(node.ChildNodes, stringBuilder, indentString, keepWhiteSpaces || nodeIsWhiteSpaceAware);


                    if (!isSelfClosingAndEmpty)
                    {
                        if (!keepWhiteSpaces && !nodeIsWhiteSpaceAware && (node.ContainsBlockElements || node.IsAlwaysWrapElement()) && !node.IsCompactElement())
                        {
                            stringBuilder.AppendLine().AddIndent(node.Level, indentString);
                        }

                        stringBuilder.Append("</").Append(node.Name).Append(">");
                    }
                }
                else if (node.NodeType == XmlNodeType.Text)
                {
                    string value;

                    bool addSpaceToBegin = false, addSpaceToEnd = false;

                    if (!keepWhiteSpaces)
                    {
                        bool startsWithWhitespace = WhitespaceCharsLookup.Contains(node.Value[0]);
                        bool endsWithWhitespace = WhitespaceCharsLookup.Contains(node.Value[node.Value.Length - 1]);

                        value = SuperTrim(node.Value);

                        if (startsWithWhitespace )
                        {
                            if ((node.PreviousNode != null && !node.PreviousNode.IsBlockElement())
                                || (node.ParentNode != null && !node.ParentNode.IsBlockElement() && !node.ParentNode.IsCompactElement()))
                            {
                                addSpaceToBegin = true;
                            }
                        }

                        if (endsWithWhitespace )
                        {
                            if ((node.NextNode != null && !node.NextNode.IsBlockElement())
                                || (node.ParentNode != null && !node.ParentNode.IsBlockElement() && !node.ParentNode.IsCompactElement()))
                            {
                                addSpaceToEnd = true;
                            }
                        }
                    }
                    else
                    {
                        value = node.Value;
                    }

                    if (addSpaceToBegin)
                    {
                        stringBuilder.Append(" ");
                    }

                    stringBuilder.Append(EncodeElementString(value));

                    if (addSpaceToEnd)
                    {
                        stringBuilder.Append(" ");
                    }
                }
                else if (node.NodeType == XmlNodeType.Whitespace || node.NodeType == XmlNodeType.SignificantWhitespace)
                {
                    if (node.PreviousNode != null && node.PreviousNode.NodeType == XmlNodeType.Element && !node.PreviousNode.IsBlockElement() &&
                        node.NextNode != null && node.NextNode.NodeType == XmlNodeType.Element && !node.NextNode.IsBlockElement())
                    {
                        stringBuilder.Append(" ");
                    }
                    else if (keepWhiteSpaces || (node.NextNode != null && node.NextNode.NodeType == XmlNodeType.Comment))
                    {
                        stringBuilder.Append(node.Value);
                    }
                }
                else if (node.NodeType == XmlNodeType.CDATA)
                {
                    if(!keepWhiteSpaces)
                    {
                        stringBuilder.AppendLine();
                    }
                    stringBuilder.Append("<![CDATA[");
                    stringBuilder.Append(node.Value);
                    stringBuilder.Append("]]>");

                    if (!keepWhiteSpaces)
                    {
                        stringBuilder.AppendLine().AddIndent(node.Level - 1, indentString);
                    }
                }
                else if (node.NodeType == XmlNodeType.Comment)
                {
                    var previousNode = node.PreviousNode;

                    if(previousNode == null || 
                        (previousNode.NodeType != XmlNodeType.Text 
                        && previousNode.NodeType != XmlNodeType.Whitespace))
                    {
                        stringBuilder.AppendLine().AddIndent(node.Level, indentString);
                    }

                    stringBuilder.Append("<!--").Append(RemoveC1EncodedAmpersands(node.Value)).Append("-->");
                    if (node.ParentNode != null && !node.ParentNode.IsBlockElement())
                    {
                        stringBuilder.AppendLine().AddIndent(node.Level - 1, indentString);
                    }
                }
                else if (node.NodeType == XmlNodeType.DocumentType)
                {
                    stringBuilder.Append("<!DOCTYPE " + node.Name);

                    foreach (XmlAttribute attribute in node.Attributes)
                    {
                        if (attribute.Name.ToLowerInvariant() != "system")
                        {
                            stringBuilder.Append(" ").Append(attribute.Name).Append(" \"").Append(attribute.Value).Append("\"");
                        }
                        else
                        {
                            stringBuilder.Append(" \"").Append(attribute.Value).Append("\"");
                        }
                    }

                    stringBuilder.AppendLine(">");
                }
                else if (node.NodeType == XmlNodeType.XmlDeclaration)
                {
                    stringBuilder.Append("<?");
                    stringBuilder.Append(node.Name);
                    stringBuilder.Append(" ");
                    stringBuilder.Append(node.Value);
                    stringBuilder.AppendLine("?>");
                }
            }
        }


        private static StringBuilder AddIndent(this StringBuilder sb, int level, string indentString)
        {
            for (int i = 0; i < level; i++)
            {
                sb.Append(indentString);
            }

            return sb;
        }



        private static string EncodeAttributeString(string value)
        {
            value = value.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;");

            return RemoveC1EncodedAmpersands(value);
        }



        private static string EncodeElementString(string value)
        {
            value = value.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;");

            return RemoveC1EncodedAmpersands(value);
        }


        private static string RemoveC1EncodedAmpersands(string value)
        {
            return _decodeRegex.Replace(value, match => "&" + match.Groups["tag"].Value);
        }


        
        /// <summary>
        /// Merges sequences of white spaces
        /// </summary>
        /// <exclude />
        public static string SuperTrim(string value)
        {
            StringBuilder sb = null;

            value = value.Trim(WhitespaceChars); /* Symbol #160 - the non-breaking space, shouldn't be trimmed */

            int index = 0;
            int oldIndex = 0;
            while (index < value.Length)
            {
                char ch = value[index];

                // If there's just one space in a sequence, ignoring it
                if (ch == ' ' && !WhitespaceCharsLookup.Contains(value[index + 1]))
                {
                    index += 2;
                    continue;
                }

                if(WhitespaceCharsLookup.Contains(ch))
                {
                    sb = sb ?? new StringBuilder();

                    sb.Append(value, oldIndex, index - oldIndex);
                    sb.Append(" ");

                    do
                    {
                        ++index;
                    } while (WhitespaceCharsLookup.Contains(value[index]));

                    oldIndex = index;
                }

                index++;
            }

            if (sb == null)
            {
                return value;
            }

            sb.Append(value, oldIndex, index - oldIndex);

            return sb.ToString();
        }



        private static IEnumerable<XmlNode> BuildTree(string xmlString, out CDataMatchHandler cdataMatchHandler)
        {
            cdataMatchHandler = new CDataMatchHandler();

            xmlString = _encodeCDataRegex.Replace(xmlString, cdataMatchHandler.Encode);

            xmlString = _encodeRegex.Replace(xmlString, delegate(Match match)
            {
                string entiryStr =  match.Groups["tag"].Value;

                return IsCorrectEscapeEntity(entiryStr) 
                    ?  _ampersandWord + entiryStr
                    : "&" + entiryStr;
            });


            var xmlReaderSettings = new XmlReaderSettings {DtdProcessing = DtdProcessing.Parse, XmlResolver = null};

            using (XmlReader xmlReader = XmlTextReader.Create(new StringReader(xmlString), xmlReaderSettings))
            {
                return BuildTree(xmlReader, 0).ToList();
            }
        }


        private static bool IsCorrectEscapeEntity(string match)
        {
            return (match.Length < 30) && match.IndexOfAny(IncorrectEscapeSequenceCharacters) == -1;
        }


        private static IEnumerable<XmlNode> BuildTree(XmlReader xmlReader, int level)
        {
            while (xmlReader.Read() )
            {
                if (xmlReader.NodeType == XmlNodeType.EndElement) yield break;

                var node = new XmlNode
                {
                    NodeType = xmlReader.NodeType,
                    Name = xmlReader.Name,
                    NamespaceURI = xmlReader.NamespaceURI ?? "",
                    Value = xmlReader.Value,
                    Level = level,
                    IsEmpty = xmlReader.IsEmptyElement
                };

                if (node.NodeType == XmlNodeType.Element || node.NodeType == XmlNodeType.DocumentType)
                {
                    int attributeCount = xmlReader.AttributeCount;
                    for (int i = 0; i < attributeCount; i++)
                    {
                        xmlReader.MoveToAttribute(i);

                        var attribute = new XmlAttribute
                        {
                            Name = xmlReader.Name, 
                            Value = xmlReader.Value
                        };

                        node.AddAttribute(attribute);
                    }

                    if (node.NodeType == XmlNodeType.Element)
                    {
                        if (!node.IsEmpty)
                        {
                            foreach (XmlNode childNode in BuildTree(xmlReader, level + 1))
                            {
                                node.AddChild(childNode);
                            }
                        }
                    }
                }

                yield return node;
            }
        }


        private enum TriState
        {
            Undefined = -1,
            False = 0,
            True = 1
        }

        [DebuggerDisplay("Type = {NodeType}, Name = {Name}, Value = {Value}")]
        private class XmlNode
        {
            private static readonly IEnumerable<XmlAttribute> EmptyAttributeList = Enumerable.Empty<XmlAttribute>();

            private XmlNode _firstNode;
            private XmlNode _lastNode;
            private List<XmlAttribute> _attributes;
            private TriState _containsBlockElements = TriState.Undefined;
            private TriState _isBlockElement = TriState.Undefined;
            private TriState _isCompactElement = TriState.Undefined;
            private TriState _isAlwaysWrapElement = TriState.Undefined;
            private NamespaceName _namespaceName;

            public XmlNodeType NodeType { get; internal set; }
            public string Name { get; internal set; }
            public string Value { get; internal set; }
            public bool IsEmpty { get; internal set; }
            public string NamespaceURI { get; internal set; }

            public int Level { get; internal set; }
            public XmlNode ParentNode { get; internal set; }
            public XmlNode PreviousNode { get; internal set; }
            public XmlNode NextNode { get; internal set; }

            private NamespaceName GetNamespaceName()
            {
                if (_namespaceName == null)
                {
                    _namespaceName = new NamespaceName { Name = this.Name.ToLowerInvariant(), Namespace = GetCustomNamespace() };
                }
                return _namespaceName;
            }


            public void AddChild(XmlNode childNode)
            {
                childNode.ParentNode = this;

                if (_lastNode != null)
                {
                    _lastNode.NextNode = childNode;
                    childNode.PreviousNode = _lastNode;
                }
                else
                {
                    _firstNode = childNode;
                }

                _lastNode = childNode;
            }



            public void AddAttribute(XmlAttribute attribute)
            {
                if (_attributes == null)
                {
                    _attributes = new List<XmlAttribute>();
                }
                _attributes.Add(attribute);
            }



            public IEnumerable<XmlNode> ChildNodes
            {
                get
                {
                    XmlNode currentNode = _firstNode;
                    while (currentNode != null)
                    {
                        yield return currentNode;
                        currentNode = currentNode.NextNode;
                    }
                }
            }



            public IEnumerable<XmlAttribute> Attributes
            {
                get
                {
                    return _attributes ?? EmptyAttributeList;
                }
            }



            public bool ContainsBlockElements
            {
                get
                {
                    if(_containsBlockElements == TriState.Undefined)
                    {
                        _containsBlockElements = ChildNodes.Any(node => node.IsBlockElement() || node.ContainsBlockElements)
                            ? TriState.True : TriState.False;
                    }

                    return _containsBlockElements == TriState.True;
                }
            }



            public string NamespaceByPrefix(string namespacePrefix)
            {
                var defined = _attributes == null ? null : _attributes.FirstOrDefault(f => f.Name == namespacePrefix);

                if (defined != null)
                {
                    return defined.Value;
                }

                if (this.ParentNode != null)
                {
                    return this.ParentNode.NamespaceByPrefix(namespacePrefix);
                }

                return null;
            }


            public bool IsCompactElement()
            {
                if (_isCompactElement == TriState.Undefined)
                {
                    _isCompactElement = this.NodeType == XmlNodeType.Element
                                      && CompactElements.Contains(GetNamespaceName())
                                      ? TriState.True : TriState.False; ;
                }

                return _isCompactElement == TriState.True;
            }


            public bool IsAlwaysWrapElement()
            {
                if (_isAlwaysWrapElement == TriState.Undefined)
                {
                    _isAlwaysWrapElement = this.NodeType == XmlNodeType.Element
                                      && AlwaysWrapElements.Contains(GetNamespaceName())
                                      ? TriState.True : TriState.False; ;
                }

                return _isAlwaysWrapElement == TriState.True;
            }
            

            public bool IsBlockElement()
            {
                if(_isBlockElement == TriState.Undefined)
                {
                    _isBlockElement = this.NodeType == XmlNodeType.Element
                                      && !InlineElements.Contains(GetNamespaceName())
                                      ? TriState.True : TriState.False; ;
                }

                return _isBlockElement == TriState.True;
            }
            

            public bool IsWhitespaceAware()
            {
                if (this.NodeType != XmlNodeType.Element) return false;

                if (WhitespaceAwareElements.Contains(GetNamespaceName())) return true;

                return false;
            }



            public bool IsSelfClosingElement()
            {
                if (this.NodeType != XmlNodeType.Element) return false;

                var name = GetNamespaceName();

                if (SelfClosingElements.Contains(name)) return true;

                return name.Namespace != "";
            }



            private string GetCustomNamespace()
            {
                string namespaceName = this.NamespaceURI.ToLowerInvariant();
                if (namespaceName == "http://www.w3.org/1999/xhtml")
                {
                    namespaceName = "";
                }

                return namespaceName;
            }
        }



        [DebuggerDisplay("Name = {Name}, Value = {Value}")]
        private class XmlAttribute
        {
            public string Name { get; internal set; }
            public string Value { get; internal set; }
        }



        internal sealed class NamespaceName
        {
            public string Name;
            public string Namespace;

            public bool Equals(NamespaceName namespaceName)
            {
                if (namespaceName == null) return false;

                return this.Name == namespaceName.Name && this.Namespace == namespaceName.Namespace;
            }

            public override bool Equals(object obj)
            {
                return Equals(obj as NamespaceName);
            }

            public override int GetHashCode()
            {
                return this.Name.GetHashCode() ^ this.Namespace.GetHashCode();
            }
        }



        private sealed class CDataMatchHandler
        {
            List<string> cDatas = new List<string>();

            public string Encode(Match match)
            {
                string s = "C1CDATAREPLACE" + cDatas.Count.ToString();

                cDatas.Add(match.Value);

                return s;
            }

            public string Decode(Match match)
            {
                int index = int.Parse(match.Groups["counter"].Value);

                return cDatas[index];
            }
        }
    }
}
