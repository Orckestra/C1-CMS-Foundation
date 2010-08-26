using System.Xml;
using System.Collections.Generic;

using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using System;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    internal sealed class BuildFromXmlPhase
    {
        private XmlReader _reader;
        private Stack<CompileTreeNode> _stack = null;


        public BuildFromXmlPhase(XmlReader reader)
        {
            _reader = reader;
        }



        public CompileTreeNode BuildTree()
        {
            _stack = new Stack<CompileTreeNode>();
            bool readDone = true;

            while (false == _reader.EOF)
            {
                readDone = _reader.Read();

                if (false == readDone && false == _reader.EOF) throw new InvalidOperationException("The XmlReader provided to the forms compiler is not readable");

                switch (_reader.NodeType)
                {
                    case XmlNodeType.Element:
                        Push(new XmlElementCompileTreeNode(new XmlSourceNodeInformation(_reader.Depth, _reader.LocalName, _reader.Name, _reader.NamespaceURI)));

                        for (int i = 0; i < _reader.AttributeCount; ++i)
                        {
                            _reader.MoveToAttribute(i);
                            if ("xmlns" != _reader.Name.ToLower())
                            {
                                PropertyCompileTreeNode property = new PropertyCompileTreeNode(_reader.LocalName, new XmlSourceNodeInformation(_reader.Depth, _reader.LocalName, _reader.Name, ""));
                                property.Value = StringResourceSystemFacade.ParseString(_reader.Value); 
                                Push(property);
                            }
                        }

                        break;

                    case XmlNodeType.EndElement:
                        Push(new XmlEndElementCompileTreeNode(new XmlSourceNodeInformation(_reader.Depth, _reader.LocalName, _reader.Name, _reader.NamespaceURI)));
                        break;

                    case XmlNodeType.Text:
                        PropertyCompileTreeNode textProperty = new PropertyCompileTreeNode(_reader.LocalName, new XmlSourceNodeInformation(_reader.Depth, CompilerGlobals.DefaultPropertyName, CompilerGlobals.DefaultPropertyName, ""));
                        textProperty.Value = StringResourceSystemFacade.ParseString(_reader.Value);
                        Push(textProperty);
                        break;
                }
            }

            return _stack.Pop();
        }



        private void Push(CompileTreeNode stackNode)
        {
            _stack.Push(stackNode);

            RestructureStack();
        }



        private void RestructureStack()
        {
            if (0 == _stack.Count) return;

            CompileTreeNode node = _stack.Peek();

            if (false == (node is XmlEndElementCompileTreeNode)) return;

            Stack<CompileTreeNode> nodes = new Stack<CompileTreeNode>();

            nodes.Push(_stack.Pop());

            while (_stack.Count > 0)
            {
                CompileTreeNode n = _stack.Peek();

                nodes.Push(_stack.Pop());

                if ((n is XmlElementCompileTreeNode) && (n.XmlSourceNodeInformation.Depth == node.XmlSourceNodeInformation.Depth)) break;
            }


            if (nodes.Count == 0) return;
            CompileTreeNode sn = nodes.Pop();

            ElementCompileTreeNode element = new ElementCompileTreeNode(sn.XmlSourceNodeInformation);
            ElementCompileTreeNode lastElement = element;

            while (nodes.Count > 1)
            {
                sn = nodes.Pop();

                if (sn is XmlElementCompileTreeNode)
                {
                    ElementCompileTreeNode elm = new ElementCompileTreeNode(sn.XmlSourceNodeInformation);

                    element.Children.Add(elm);

                    lastElement = elm;
                }
                else if (sn is ElementCompileTreeNode)
                {
                    element.Children.Add(sn as ElementCompileTreeNode);
                }
                else if (sn is PropertyCompileTreeNode)
                {
                    if (sn.XmlSourceNodeInformation.Name == CompilerGlobals.DefaultPropertyName)
                    {
                        lastElement.DefaultProperties.Add(sn as PropertyCompileTreeNode);
                    }
                    else
                    {
                        lastElement.AddNamedProperty(sn as PropertyCompileTreeNode);
                    }
                }
            }

            _stack.Push(element);
        }

        private sealed class XmlElementCompileTreeNode : ElementCompileTreeNode
        {
            public XmlElementCompileTreeNode(XmlSourceNodeInformation sourceInformation)
                : base(sourceInformation)
            {
            }
        }

        private sealed class XmlEndElementCompileTreeNode : ElementCompileTreeNode
        {
            public XmlEndElementCompileTreeNode(XmlSourceNodeInformation sourceInformation)
                : base(sourceInformation)
            {
            }
        }
    }
}
