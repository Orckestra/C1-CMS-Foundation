using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Data.Types;


namespace Composite.Data.DynamicTypes.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DynamicTypesAlternateFormFacade
    {
        // returns null if no alternate form exists
        /// <exclude />
        public static string GetAlternateFormMarkup(DataTypeDescriptor dataTypeDescriptor)
        {
            var file = GetAlternateFormMarkupFile(dataTypeDescriptor.Namespace, dataTypeDescriptor.Name);

            return file != null ? file.ReadAllText() : null;
        }

        internal static IFile GetAlternateFormMarkupFile(string @namespace, string typeName)
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
        public static void SetAlternateForm(DataTypeDescriptor dataTypeDescriptor, string newFormMarkup)
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
