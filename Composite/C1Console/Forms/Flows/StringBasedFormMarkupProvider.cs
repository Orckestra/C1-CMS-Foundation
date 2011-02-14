using System;
using System.IO;
using System.Xml;


namespace Composite.C1Console.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class StringBasedFormMarkupProvider : IFormMarkupProvider
    {
        private string Document { get; set; }

        /// <exclude />
        public StringBasedFormMarkupProvider(string document)
        {
            if (document == null) throw new ArgumentNullException("document");

            this.Document = document;
        }


        /// <exclude />
        public XmlReader GetReader()
        {
            return new XmlTextReader(new StringReader(this.Document));
        }
    }
}
