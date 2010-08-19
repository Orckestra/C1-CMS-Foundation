using System;

namespace Composite.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class CodeGenerationHelper
	{
        public static string GetTypeAlias(Type type)
        {
            return GetTypeAlias(type.FullName);
        }

        public static string GetTypeAlias(string typeFullName)
        {
            return typeFullName.Replace(".", "_");
        }
	}
}
