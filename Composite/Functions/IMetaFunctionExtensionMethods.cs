using System.Collections.Generic;
using System.Linq;
using Composite.Extensions;
using Composite.ResourceSystem;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class IMetaFunctionExtensionMethods
	{
        public static string CompositeName(this IMetaFunction metaFunction)
        {
            return CompositeName(metaFunction.Namespace, metaFunction.Name);
        }



        public static string CompositeName(string namespaceName, string name)
        {
            return StringExtensionMethods.CreateNamespace(namespaceName, name, '.');
        }



        public static bool IsNamespaceCorrectFormat(this IMetaFunction metaFunction)
        {
            if (metaFunction.Namespace == "") return true;

            if (metaFunction.Namespace.StartsWith(".") == true) return false;
            if (metaFunction.Namespace.EndsWith(".") == true) return false;

            string[] splits = metaFunction.Namespace.Split('.');
            foreach (string split in splits)
            {
                if (split == "") return false;
            }

            return true;
        }



        public static bool ValidateParameterProfiles(this IMetaFunction metaFunction)
        {
            List<string> names = new List<string>();

            foreach (ParameterProfile parameterProfile in metaFunction.ParameterProfiles)
            {
                if (names.Contains(parameterProfile.Name) == true)
                {
                    return false;
                }
                else
                {
                    names.Add(parameterProfile.Name);
                }
            }

            return true;
        }




        public static string DescriptionLocalized(this IMetaFunction function)
        {
            if (function.Description.Contains("${"))
            {
                return StringResourceSystemFacade.ParseString(function.Description);
            }
            else
            {
                return function.Description;
            }
        }

	}
}
