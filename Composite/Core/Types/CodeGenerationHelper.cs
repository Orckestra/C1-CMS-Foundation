using System;

namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class CodeGenerationHelper
	{
        /// <exclude />
        public static string GetTypeAlias(Type type)
        {
            return GetTypeAlias(type.FullName);
        }

        /// <exclude />
        public static string GetTypeAlias(string typeFullName)
        {
            return typeFullName.Replace(".", "_");
        }
	}
}
