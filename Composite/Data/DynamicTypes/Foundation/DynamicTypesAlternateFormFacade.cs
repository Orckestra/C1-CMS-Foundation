using System;
using System.Linq;
using System.Xml.Linq;
using Composite.Data.Types;


namespace Composite.Data.DynamicTypes.Foundation
{
    internal static class DynamicTypesAlternateFormFacade
    {
        // returns null if no alternate form exists
        public static string GetAlternateFormMarkup(DataTypeDescriptor dataTypeDescriptor)
        {
            string dynamicDataFormFolderPath = GetFolderPath(dataTypeDescriptor);
            string dynamicDataFormFileName = GetFilename(dataTypeDescriptor);

            IDynamicTypeFormDefinitionFile formOverride = 
                DataFacade.GetData<IDynamicTypeFormDefinitionFile>().
                Where(f => f.FolderPath.ToLower() == dynamicDataFormFolderPath.ToLower() && f.FileName.ToLower() == dynamicDataFormFileName.ToLower()).
                FirstOrDefault();

            if (formOverride == null)
            {
                return null;
            }
            else
            {
                return formOverride.ReadAllText();
            }
        }



        public static void SetAlternateForm(DataTypeDescriptor dataTypeDescriptor, string newFormMarkup)
        {
            string dynamicDataFormFolderPath = GetFolderPath(dataTypeDescriptor);
            string dynamicDataFormFileName = GetFilename(dataTypeDescriptor);

            try
            {
                XDocument parsed = XDocument.Parse(newFormMarkup);
            }
            catch (Exception)
            {
                throw;
            }

            IDynamicTypeFormDefinitionFile formDefinitionFile =
                DataFacade.GetData<IDynamicTypeFormDefinitionFile>().Where(f => f.FolderPath.ToLower() == dynamicDataFormFolderPath.ToLower() && f.FileName.ToLower() == dynamicDataFormFileName.ToLower()).
                FirstOrDefault();

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



        private static string GetFilename(DataTypeDescriptor dataTypeDescriptor)
        {
            return string.Format("{0}.xml", dataTypeDescriptor.Name);
        }



        private static string GetFolderPath(DataTypeDescriptor dataTypeDescriptor)
        {
            return "\\" + dataTypeDescriptor.Namespace.Replace('.', '\\');
        }
    }
}
