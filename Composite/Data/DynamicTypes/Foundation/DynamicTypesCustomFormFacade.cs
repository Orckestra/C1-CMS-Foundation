using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Data.Types;
using Composite.Plugins.Data.DataProviders.FileSystemDataProvider.Foundation;


namespace Composite.Data.DynamicTypes.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class DynamicTypesCustomFormFacade
    {
        /// <summary>
        /// Returns custom form markup. 
        /// </summary>
        /// <param name="dataTypeDescriptor">A data type descriptor</param>
        /// <returns></returns>
        public static XDocument GetCustomFormMarkup(DataTypeDescriptor dataTypeDescriptor)
        {
            var file = GetCustomFormMarkupFile(dataTypeDescriptor.Namespace, dataTypeDescriptor.Name);

            if (file == null)
            {
                return null;
            }

            var markupFilePath = (file as FileSystemFile).SystemPath;

            return XDocumentUtils.Load(markupFilePath, LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);
        }

        internal static IFile GetCustomFormMarkupFile(string @namespace, string typeName)
        {
            string dynamicDataFormFolderPath = GetFolderPath(@namespace);
            string dynamicDataFormFileName = GetFilename(typeName);

            IDynamicTypeFormDefinitionFile formOverride =
                DataFacade.GetData<IDynamicTypeFormDefinitionFile>()
                          .FirstOrDefault(f => f.FolderPath.Equals(dynamicDataFormFolderPath, StringComparison.OrdinalIgnoreCase)
                                            && f.FileName.Equals(dynamicDataFormFileName, StringComparison.OrdinalIgnoreCase));

            return formOverride;
        }



        /// <exclude />
        public static void SetCustomForm(DataTypeDescriptor dataTypeDescriptor, string newFormMarkup)
        {
            string dynamicDataFormFolderPath = GetFolderPath(dataTypeDescriptor.Namespace);
            string dynamicDataFormFileName = GetFilename(dataTypeDescriptor.Name);

            // Parsing for assertion
            XDocument.Parse(newFormMarkup);

            IDynamicTypeFormDefinitionFile formDefinitionFile =
                DataFacade.GetData<IDynamicTypeFormDefinitionFile>()
                  .FirstOrDefault(f => f.FolderPath.Equals(dynamicDataFormFolderPath, StringComparison.OrdinalIgnoreCase) 
                                    && f.FileName.Equals(dynamicDataFormFileName, StringComparison.OrdinalIgnoreCase));

            if (formDefinitionFile == null)
            {
                var newFile = DataFacade.BuildNew<IDynamicTypeFormDefinitionFile>();
                newFile.FolderPath = dynamicDataFormFolderPath;
                newFile.FileName = dynamicDataFormFileName;
                newFile.SetNewContent(newFormMarkup);
                formDefinitionFile = DataFacade.AddNew<IDynamicTypeFormDefinitionFile>(newFile);
            }
            else
            {
                formDefinitionFile.SetNewContent(newFormMarkup);
                DataFacade.Update(formDefinitionFile);
            }
        }



        private static string GetFilename(string typeName)
        {
            return string.Format("{0}.xml", typeName);
        }



        private static string GetFolderPath(string @namespace)
        {
            return "\\" + @namespace.Replace('.', '\\');
        }
    }
}
