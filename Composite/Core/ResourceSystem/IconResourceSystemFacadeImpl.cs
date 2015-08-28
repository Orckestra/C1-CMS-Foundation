using Composite.Core.Extensions;


namespace Composite.Core.ResourceSystem
{
    internal class IconResourceSystemFacadeImpl : IIconResourceSystemFacade
    {
        public ResourceHandle GetResourceHandle(string iconName)
        {
            if (string.IsNullOrEmpty(iconName)) return null;

            if (!iconName.IsCorrectNamespace('.'))
            {
                Log.LogWarning("IconResourceSystemFacade", "The namespace '{0}' is not correct.", iconName);
                return null;
            }

            string resourceName = iconName.GetNameFromNamespace();
            string namespaceName = iconName.GetNamespace();

            return new ResourceHandle(namespaceName, resourceName);
        }
    }
}
