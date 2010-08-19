using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.IO;
using Composite.Forms.Flows;


namespace Composite.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class StringBasedFormMarkupProvider : IFormMarkupProvider
    {
        private string Document { get; set; }

        public StringBasedFormMarkupProvider(string document)
        {
            if (document == null) throw new ArgumentNullException("document");

            this.Document = document;
        }



        public XmlReader GetReader()
        {
            return new XmlTextReader(new StringReader(this.Document));
        }
    }
}
