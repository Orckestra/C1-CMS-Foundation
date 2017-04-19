using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using Composite.C1Console.Forms.Flows;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Forms.DataServices
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class FormDefinitionFileMarkupProvider : IFormMarkupProvider, ITestAutomationLocatorInformation
    {
        private readonly string _formPath;


        /// <exclude />
        public FormDefinitionFileMarkupProvider(string formPath)
        {
            Verify.ArgumentNotNullOrEmpty(formPath, "formPath");

            _formPath = formPath;
        }

        /// <exclude />
        public string TestAutomationLocator
        {
            get
            {
                return Path.GetFileNameWithoutExtension(_formPath);
            }
        }

        /// <exclude />
        public XmlReader GetReader()
        {
            string folderPath = Path.GetDirectoryName(_formPath).ToLowerInvariant();
            string fileName = Path.GetFileName(_formPath).ToLowerInvariant();

            List<IFormDefinitionFile> formFiles =
                (from file in DataFacade.GetData<IFormDefinitionFile>()
                 where file.FolderPath.ToLowerInvariant() == folderPath && file.FileName.ToLowerInvariant() == fileName
                 select file).ToList();

            if (formFiles.Count == 0) throw new InvalidOperationException(string.Format("No form definition with path '{0}' was found. Please use a virtual Form Path", _formPath));
            if (formFiles.Count > 1) throw new InvalidOperationException(string.Format("Multiple form definitions with path '{0}' was found", _formPath));

            return new XmlTextReader(formFiles[0].GetReadStream());
        }
    }
}