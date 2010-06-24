using System;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;


namespace Composite.Trees.Foundation
{
    internal static class FactoryHelper
    {
        internal static ResourceHandle GetIcon(string name)
        {
            if (name.Contains(",") == false)
            {
                return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
            }

            throw new NotImplementedException();
        }
    }
}