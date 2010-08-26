using System;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;


namespace Composite.C1Console.Trees.Foundation
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