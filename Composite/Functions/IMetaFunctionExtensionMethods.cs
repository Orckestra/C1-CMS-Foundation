using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class IMetaFunctionExtensionMethods
	{
        /// <exclude />
        public static string CompositeName(this IMetaFunction metaFunction)
        {
            return CompositeName(metaFunction.Namespace, metaFunction.Name);
        }



        /// <exclude />
        public static string CompositeName(string namespaceName, string name)
        {
            return StringExtensionMethods.CreateNamespace(namespaceName, name, '.');
        }



        /// <exclude />
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



        /// <exclude />
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



        /// <exclude />
        public static string DescriptionLocalized(this IMetaFunction function)
        {
            if (function.Description != null && function.Description.Contains("${"))
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
