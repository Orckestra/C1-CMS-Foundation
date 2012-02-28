using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem.Foundation;
using Composite.Core.ResourceSystem.Foundation.PluginFacades;


namespace Composite.Core.ResourceSystem
{
    internal class IconResourceSystemFacadeImpl : IIconResourceSystemFacade
    {
        public IEnumerable<ResourceHandle> GetAllIconHandles()
        {
            return
                from provider in ResourceProviderRegistry.IconResourceProviderNames
                from iconName in ResourceProviderPluginFacade.GetIconNames(provider)
                select new ResourceHandle(provider, iconName);
        }



        public ResourceHandle GetResourceHandle(string iconName)
        {
            if (iconName != string.Empty)
            {
                if (iconName.IsCorrectNamespace('.'))
                {
                    string resourceName = iconName.GetNameFromNamespace();
                    string namespaceName = iconName.GetNamespace();

                    var count = (from item in GetAllIconHandles()
                                 where item.ResourceName == resourceName && item.ResourceNamespace == namespaceName
                                 select item).Count();

                    if (count > 0)
                    {
                        return new ResourceHandle(namespaceName, resourceName);
                    }
                    else
                    {
                        LoggingService.LogWarning("IconResourceSystemFacade", string.Format("The icon {0} could not be found.", iconName));
                    }
                }
                else
                {
                    LoggingService.LogWarning("IconResourceSystemFacade", string.Format("The namespace {0} is not correct.", iconName));
                }
            }

            return null;
        }



        public Bitmap GetIcon(ResourceHandle resourceHandle, IconSize iconSize)
        {
            if (null == resourceHandle) throw new ArgumentNullException("resourceHandle");

            //TODO: Find the right CultureInfo and use here!! Old: Composite.Management.OLD.GlobalizationService.CultureInfoProxy
            return ResourceProviderPluginFacade.GetIcon(resourceHandle.ResourceNamespace, resourceHandle.ResourceName, iconSize, C1Console.Users.UserSettings.C1ConsoleUiLanguage);
        }
    }
}
