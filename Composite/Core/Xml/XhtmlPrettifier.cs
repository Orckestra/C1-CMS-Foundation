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
        private static Regex _encodeCDataRegex = new Regex(@"<!\[CDATA\[((?:[^]]|\](?!\]>))*)\]\]>", RegexOptions.Compiled);
        private static Regex _decodeCDataRegex = new Regex("C1CDATAREPLACE(?<counter>[0-9]*)", RegexOptions.Compiled);
        private static Regex _encodeRegex = new Regex(@"&(?<tag>[^\;]+;)", RegexOptions.Compiled);
        private static Regex _decodeRegex = new Regex(@"C1AMPERSAND(?<tag>[^\;]+;)", RegexOptions.Compiled);
        

        private static readonly char[] WhitespaceChars = new char[] { '\t', '\n', '\v', '\f', '\r', ' ', '\x0085', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '​', '\u2028', '\u2029', '　', '﻿' };
        private static readonly HashSet<char> WhitespaceCharsLookup = new HashSet<char>(WhitespaceChars);


        private static readonly HashSet<NamespaceName> InlineElements = new HashSet<NamespaceName>(new []
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
            new NamespaceName { Name = "font", Namespace = "" }, 
            new NamespaceName { Name = "i", Namespace = "" }, 
            new NamespaceName { Name = "img", Namespace = "" }, 
            new NamespaceName { Name = "input", Namespace = "" }, 
            new NamespaceName { Name = "kbd", Namespace = "" }, 
            new NamespaceName { Name = "label", Namespace = "" }, 
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
            new NamespaceName { Name = "fieldreference", Namespace = Namespaces.DynamicData10.NamespaceName },
            new NamespaceName { Name = "page.title", Namespace = Namespaces.Rendering10.NamespaceName },
            new NamespaceName { Name = "page.description", Namespace = Namespaces.Rendering10.NamespaceName },
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
            CDataMatchHandler cdataMatchHandler;

            IEnumerable<XmlNode> tree = BuildTree(xmlString, out cdataMatchHandler);

            StringBuilder sb = new StringBuilder();
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
                        && ((node.IsBlockElement() == true) || (node.ContainsBlockElements == true) || ((node.ParentNode != null) && (node.ParentNode.ContainsBlockElements))) && (node.Level > 0))
                    {
                        stringBuilder.AppendLine();
                        stringBuilder.Append(GetIndent(node.Level, indentString));
                    }

                    stringBuilder.Append("<" + node.Name);
                    foreach (XmlAttribute attribute in node.Attributes)
                    {
                        if ((attribute.Name.ToLower().StartsWith("xmlns") == false) ||
                            (node.ParentNode == null) || (node.ParentNode.NamespaceDefined(attribute.Name) == false))
                        {
                            stringBuilder.Append(" " + attribute.Name + "=\"" + EncodeAttributeString(attribute.Value) + "\"");
                        }
                    }

                    bool isSelfClosingAndEmpty = false;
                    if ((node.IsSelfClosingElement() == true) && (node.ChildNodes.Where(f => f.NodeType == XmlNodeType.Element).Any() == false) && (node.ChildNodes.Where(f => f.NodeType == XmlNodeType.Text).Any() == false))
                    {
                        isSelfClosingAndEmpty = true;
                    }

                    if ((node.IsEmpty == false) && (isSelfClosingAndEmpty == false))
                    {
                        stringBuilder.Append(">");
                    }
                    else
                    {
                        stringBuilder.Append(" />");
                    }

                    bool nodeIsWhiteSpaceAware = node.IsWhitespaceAware();

                    // Recursive call
                    NodeTreeToString(node.ChildNodes, stringBuilder, indentString, keepWhiteSpaces || nodeIsWhiteSpaceAware);


                    if ((node.IsEmpty == false) && (isSelfClosingAndEmpty == false))
                    {
                        if (!keepWhiteSpaces && !nodeIsWhiteSpaceAware && node.ContainsBlockElements)
                        {
                            stringBuilder.AppendLine();
                            stringBuilder.Append(GetIndent(node.Level, indentString));
                        }

                        stringBuilder.Append("</" + node.Name + ">");
                    }
                }
                else if (node.NodeType == XmlNodeType.Text)
                {
                    string value;

                    if (!keepWhiteSpaces)
                    {
                        bool startsWithWhitespace = WhitespaceCharsLookup.Contains(node.Value[0]);
                        bool endsWithWhitespace = WhitespaceCharsLookup.Contains(node.Value[node.Value.Length - 1]);

                        value = SuperTrim(node.Value);

                        if (startsWithWhitespace == true)
                        {
                            if (((node.PreviousNode != null) && (node.PreviousNode.IsBlockElement() == false)) |
                                ((node.ParentNode != null) && (node.ParentNode.IsBlockElement() == false)))
                            {
                                value = " " + value;
                            }
                        }

                        if (endsWithWhitespace == true)
                        {
                            if (((node.NextNode != null) && (node.NextNode.IsBlockElement() == false)) ||
                                ((node.ParentNode != null) && (node.ParentNode.IsBlockElement() == false)))
                            {
                                value += " ";
                            }
                        }
                    }
                    else
                    {
                        value = node.Value;
                    }

                    stringBuilder.Append(EncodeElementString(value));
                }
                else if ((node.NodeType == XmlNodeType.Whitespace) || (node.NodeType == XmlNodeType.SignificantWhitespace))
                {
                    if ((node.PreviousNode != null) && (node.PreviousNode.NodeType == XmlNodeType.Element) && (node.PreviousNode.IsBlockElement() == false) &&
                        (node.NextNode != null) && (node.NextNode.NodeType == XmlNodeType.Element) && (node.NextNode.IsBlockElement() == false))
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
                        stringBuilder.AppendLine();
                        stringBuilder.Append(GetIndent(node.Level - 1, indentString));
                    }
                }
                else if (node.NodeType == XmlNodeType.Comment)
                {
                    var previousNode = node.PreviousNode;

                    if(previousNode == null || 
                        (previousNode.NodeType != XmlNodeType.Text 
                        && previousNode.NodeType != XmlNodeType.Whitespace))
                    {
                        stringBuilder.AppendLine();
                        stringBuilder.Append(GetIndent(node.Level, indentString));
                    }

                    stringBuilder.Append("<!--" + RemoveC1EncodedAmpersands(node.Value) + "-->");
                    if ((node.ParentNode != null) && (node.ParentNode.IsBlockElement() == false))
                    {
                        stringBuilder.AppendLine();
                        stringBuilder.Append(GetIndent(node.Level - 1, indentString));
                    }
                }
                else if (node.NodeType == XmlNodeType.DocumentType)
                {
                    stringBuilder.Append("<!DOCTYPE " + node.Name);

                    foreach (XmlAttribute attribute in node.Attributes)
                    {
                        if (attribute.Name.ToLower() != "system")
                        {
                            stringBuilder.Append(" " + attribute.Name + " \"" + attribute.Value + "\"");
                        }
                        else
                        {
                            stringBuilder.Append(" \"" + attribute.Value + "\"");
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



        private static string GetIndent(int level, string indentString)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < level; i++)
            {
                sb.Append(indentString);
            }

            return sb.ToString();
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


        /// <exclude />
        public static string SuperTrim(string value)
        {
            StringBuilder sb = new StringBuilder();

            value = value.Trim(WhitespaceChars); /* Symbol #160 - the non-breaking space, shouldn't be trimmed */

            int index = 0;
            int oldIndex = 0;
            while (index < value.Length)
            {
                if (WhitespaceCharsLookup.Contains(value[index]) == true)
                {
                    sb.Append(value.Substring(oldIndex, index - oldIndex));
                    sb.Append(" ");

                    while (WhitespaceCharsLookup.Contains(value[index]) == true)
                    {
                        ++index;
                    }

                    oldIndex = index;
                }

                index++;
            }

            sb.Append(value.Substring(oldIndex, index - oldIndex));

            return sb.ToString();
        }



        private static IEnumerable<XmlNode> BuildTree(string xmlString, out CDataMatchHandler cdataMatchHandler)
        {
            cdataMatchHandler = new CDataMatchHandler();

            xmlString = _encodeCDataRegex.Replace(xmlString, cdataMatchHandler.Encode);

            xmlString = _encodeRegex.Replace(xmlString, delegate(Match match)
            {
                return _ampersandWord + match.Groups["tag"].Value;
            });


            XmlReaderSettings xmlReaderSettings = new XmlReaderSettings();
            xmlReaderSettings.DtdProcessing = DtdProcessing.Parse;
            xmlReaderSettings.XmlResolver = null;

            using (XmlReader xmlReader = XmlTextReader.Create(new StringReader(xmlString), xmlReaderSettings))
            {
                return BuildTree(xmlReader, 0).ToList();
            }
        }



        private static IEnumerable<XmlNode> BuildTree(XmlReader xmlReader, int level)
        {
            while (xmlReader.Read() == true)
            {
                if (xmlReader.NodeType == XmlNodeType.EndElement) yield break;

                XmlNode node = new XmlNode();
                node.NodeType = xmlReader.NodeType;
                node.Name = xmlReader.Name;
                node.NamespaceURI = xmlReader.NamespaceURI ?? "";
                node.Value = xmlReader.Value;
                node.Level = level;
                node.IsEmpty = xmlReader.IsEmptyElement;

                if ((node.NodeType == XmlNodeType.Element) || (node.NodeType == XmlNodeType.DocumentType))
                {
                    int attributeCount = xmlReader.AttributeCount;
                    for (int i = 0; i < attributeCount; i++)
                    {
                        xmlReader.MoveToAttribute(i);

                        XmlAttribute attribute = new XmlAttribute();
                        attribute.Name = xmlReader.Name;
                        attribute.Value = xmlReader.Value;

                        node.AddAttribute(attribute);
                    }

                    if (node.NodeType == XmlNodeType.Element)
                    {
                        if (node.IsEmpty == false)
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




        [DebuggerDisplay("Type = {NodeType}, Name = {Name}, Value = {Value}")]
        private class XmlNode
        {
            private XmlNode _firstNode = null;
            private XmlNode _lastNode = null;
            private List<XmlAttribute> _attributes = new List<XmlAttribute>();
            private bool? _containsBlockElements;
            private bool? _isBlockElement;

            public XmlNodeType NodeType { get; internal set; }
            public string Name { get; internal set; }

            public string LocalName { 
                get
                {
                    // TODO: refactor
                    string name = Name;
                    int separatorIndex = name.IndexOf(":");
                    if(separatorIndex < 0)
                    {
                        return name;
                    }
                    return name.Substring(separatorIndex + 1);
                }
            }

            public string Value { get; internal set; }
            public bool IsEmpty { get; internal set; }
            public string NamespaceURI { get; internal set; }

            public int Level { get; internal set; }
            public XmlNode ParentNode { get; internal set; }
            public XmlNode PreviousNode { get; internal set; }
            public XmlNode NextNode { get; internal set; }



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
                    return _attributes;
                }
            }



            public bool ContainsBlockElements
            {
                get
                {
                    if(_containsBlockElements == null)
                    {
                        _containsBlockElements = ChildNodes.Any(node => node.IsBlockElement() || node.ContainsBlockElements);
                    }

                    return _containsBlockElements.Value;
                }
            }



            public bool NamespaceDefined(string namespaceName)
            {
                bool defined = _attributes.Where(f => f.Name == namespaceName).Any();

                if ((defined == false) && (this.ParentNode != null))
                {
                    return this.ParentNode.NamespaceDefined(namespaceName);
                }

                return defined;
            }



            public bool IsBlockElement()
            {
                if(_isBlockElement == null)
                {
                    _isBlockElement = this.NodeType == XmlNodeType.Element
                                      && !InlineElements.Contains(new NamespaceName { Name = this.Name.ToLower(), Namespace = GetNamespace() });
                }

                return _isBlockElement.Value;
            }



            public bool IsWhitespaceAware()
            {
                if (this.NodeType != XmlNodeType.Element) return false;

                if (WhitespaceAwareElements.Contains(new NamespaceName { Name = this.LocalName.ToLower(), Namespace = GetNamespace() }) == true) return true;

                return false;
            }



            public bool IsSelfClosingElement()
            {
                if (this.NodeType != XmlNodeType.Element) return false;

                if (SelfClosingElements.Contains(new NamespaceName { Name = this.Name.ToLower(), Namespace = GetNamespace() }) == true) return true;

                return false;
            }



            private string GetNamespace()
            {
                string namespaceName = this.NamespaceURI.ToLower();
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



        private sealed class NamespaceName
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
