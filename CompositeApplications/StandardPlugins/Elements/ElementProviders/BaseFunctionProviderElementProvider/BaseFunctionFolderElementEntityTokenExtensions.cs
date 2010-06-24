namespace Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    public static class BaseFunctionFolderElementEntityTokenExtensions
	{
        public static string GetNamespace(this BaseFunctionFolderElementEntityToken entityToken)
        {
            int index = entityToken.Id.IndexOf('.');

            if (index != -1)
            {
                return entityToken.Id.Remove(0, index + 1);
            }
            else
            {
                return entityToken.Id;
            }
        }
	}
}
