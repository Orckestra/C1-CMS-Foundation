using Composite.Data.Types;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
    internal static class Common
    {
        internal static string CreateXslFilePath(this IXsltFunction xsltFunction)
        {
            return string.Format("/{0}/{1}.xsl", xsltFunction.Namespace.Replace(".", "/"), xsltFunction.Name).Replace("//", "/").Replace('\\', '/');
        }


        internal static bool ValidateXslFilePath(this IXsltFunction xsltFunction)
        {
            if (xsltFunction.XslFilePath == null) return false;
            if (xsltFunction.XslFilePath.Length > 240) return false;       

            return true;
        }
    }
}
