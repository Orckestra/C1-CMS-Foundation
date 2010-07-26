using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.Forms.DataServices.Foundation
{
    internal static class FormBuilder
    {
        internal static FormTreeCompiler Build(string formPath, IFormChannelIdentifier channel, Dictionary<string, object> bindings, bool debugMode)
        {
            string folderPath = Path.GetDirectoryName(formPath);
            string fileName = Path.GetFileName(formPath);

            List<IFormDefinitionFile> formFiles =
                (from file in DataFacade.GetData<IFormDefinitionFile>()
                 where file.FolderPath == folderPath && file.FileName == fileName
                 select file).ToList();

            if (formFiles.Count == 0) throw new ArgumentException(string.Format("No form definition with path '{0}' was found. Please use a virtual Form Path", formPath), "formPath");
            if (formFiles.Count > 1) throw new ArgumentException(string.Format("Multiple  form definitions with path '{0}' was found", formPath), "formPath");

            FormTreeCompiler compiler = new FormTreeCompiler();

            using (XmlTextReader formMarkupReader = new XmlTextReader(formFiles[0].GetReadStream()))
            {
                compiler.Compile(formMarkupReader, channel, bindings, debugMode);
                return compiler;
            }
        }
    }
}
