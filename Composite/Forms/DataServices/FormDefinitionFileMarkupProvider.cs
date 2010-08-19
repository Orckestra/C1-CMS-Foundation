using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using Composite.Data;
using Composite.Data.Types;
using Composite.Forms.Flows;


namespace Composite.Forms.DataServices
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class FormDefinitionFileMarkupProvider : IFormMarkupProvider
    {
        private string _formPath;


        public FormDefinitionFileMarkupProvider(string formPath)
        {
            if (string.IsNullOrEmpty(formPath) == true) throw new ArgumentException("Path can not be empty", formPath);
            _formPath = formPath;
        }


        public XmlReader GetReader()
        {
            string folderPath = Path.GetDirectoryName(_formPath);
            string fileName = Path.GetFileName(_formPath);

            List<IFormDefinitionFile> formFiles =
                (from file in DataFacade.GetData<IFormDefinitionFile>()
                 where file.FolderPath == folderPath && file.FileName == fileName
                 select file).ToList();

            if (formFiles.Count == 0) throw new InvalidOperationException(string.Format("No form definition with path '{0}' was found. Please use a virtual Form Path", _formPath));
            if (formFiles.Count > 1) throw new InvalidOperationException(string.Format("Multiple form definitions with path '{0}' was found", _formPath));

            return new XmlTextReader(formFiles[0].GetReadStream());
        }
    }
}