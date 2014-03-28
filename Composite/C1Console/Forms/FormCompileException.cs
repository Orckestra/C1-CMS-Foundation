using System;

using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;


namespace Composite.C1Console.Forms
{
    internal class FormCompileException : ApplicationException
    {
        private readonly XmlSourceNodeInformation _xmlInformation;
        private readonly XmlSourceNodeInformation _propertyXmlInformation;
        private readonly XmlSourceNodeInformation _extraPropertyXmlInformation;

        public FormCompileException(string message, XmlSourceNodeInformation xmlInformation)
            : base(message)
        {
            _xmlInformation = xmlInformation;
        }

        public FormCompileException(string message, XmlSourceNodeInformation xmlInformation, XmlSourceNodeInformation propertyXmlInformation)
            : base(message)
        {
            _xmlInformation = xmlInformation;
            _propertyXmlInformation = propertyXmlInformation;
        }

        public FormCompileException(string message, CompileTreeNode treeNode, CompileTreeNode propertyTreeNode)
            : this(message, treeNode.XmlSourceNodeInformation, propertyTreeNode.XmlSourceNodeInformation)
        {
        }

        public FormCompileException(string message, XmlSourceNodeInformation xmlInformation, XmlSourceNodeInformation propertyXmlInformation, XmlSourceNodeInformation extraPropertyXmlInformation)
            : base(message)
        {
            _xmlInformation = xmlInformation;
            _propertyXmlInformation = propertyXmlInformation;
            _extraPropertyXmlInformation = extraPropertyXmlInformation;
        }

        public FormCompileException(string message, XmlSourceNodeInformation xmlInformation, Exception inner)
            : base(message, inner)
        {
            _xmlInformation = xmlInformation;
        }

        public string TagName
        {
            get { return _xmlInformation.TagName; }
        }

        public string XPath
        {
            get { return _xmlInformation.XPath; }
        }

        public override string ToString()
        {
            string result = Message;

            if (null != _xmlInformation)
            {
                result = string.Format("{0}\n\nTag = {1}\nXPath = {2}", result, _xmlInformation.TagName, _xmlInformation.XPath);
            }

            if (null != _propertyXmlInformation)
            {
                result = string.Format("{0}\n\nProperty:\nTag = {1}\nXPath = {2}", result, _propertyXmlInformation.TagName, _propertyXmlInformation.XPath);
            }

            if (null != _extraPropertyXmlInformation)
            {
                result = string.Format("{0}\n\nProperty:\nTag = {1}\nXPath = {2}", result, _extraPropertyXmlInformation.TagName, _extraPropertyXmlInformation.XPath);
            }

            return result;
        }
    }

}
