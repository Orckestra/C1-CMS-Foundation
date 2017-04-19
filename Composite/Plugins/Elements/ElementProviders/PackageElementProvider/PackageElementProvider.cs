using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Core.PackageSystem;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Core.Extensions;

namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [ConfigurationElementType(typeof(PackageElementProviderData))]
    internal sealed class PackageElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        private static ResourceHandle RootClosedIcon = GetIconHandle("package-element-closed-root");
        private static ResourceHandle RootOpenedIcon = GetIconHandle("package-element-opened-root");
        private static ResourceHandle AvailablePackagesClosedIcon = GetIconHandle("package-element-closed-available");
        private static ResourceHandle AvailablePackagesOpenedIcon = GetIconHandle("package-element-opened-available");
        private static ResourceHandle InstalledPackagesClosedIcon = GetIconHandle("package-element-closed-installed");
        private static ResourceHandle InstalledPackagesOpenedIcon = GetIconHandle("package-element-opened-installed");
        private static ResourceHandle PackageSourcesClosedIcon = GetIconHandle("package-element-closed-sources");
        private static ResourceHandle PackageSourcesOpenedIcon = GetIconHandle("package-element-opened-sources");
        private static ResourceHandle PackageSourceItemClosedIcon = GetIconHandle("package-element-closed-sourceitem");
        private static ResourceHandle AvailablePackagesGroupClosedIcon = GetIconHandle("package-element-closed-availablegroup");
        private static ResourceHandle AvailablePackagesGroupOpenedIcon = GetIconHandle("package-element-opened-availablegroup");
        private static ResourceHandle LocalPackagesClosedIcon = GetIconHandle("package-element-closed-local");
        private static ResourceHandle LocalPackagesOpenedIcon = GetIconHandle("package-element-opened-local");
        private static ResourceHandle InstalledPackagesGroupClosedIcon = GetIconHandle("package-element-closed-installedgroup");
        private static ResourceHandle InstalledPackagesGroupOpenedIcon = GetIconHandle("package-element-opened-installedgroup");
        private static ResourceHandle AvailablePackageItemIcon = GetIconHandle("package-element-closed-availableitem");
        private static ResourceHandle AvailableCommercialPackageItemIcon = GetIconHandle("package-element-item-commercial");
        private static ResourceHandle InstalledPackageItemIcon = GetIconHandle("package-element-closed-installeditem");
        private static ResourceHandle InstalledCommercialPackageItemIcon = GetIconHandle("package-element-item-commercial");

        private static ResourceHandle ClearServerCacheIcon = GetIconHandle("package-clear-servercache");
        private static ResourceHandle ViewAvailableInformationIcon = GetIconHandle("package-view-availableinfo");
        private static ResourceHandle ViewInstalledInformationIcon = GetIconHandle("package-view-installedinfo");
        private static ResourceHandle InstallIcon = GetIconHandle("package-install-package");
        
        private static ResourceHandle InstallLocalPackageIcon = GetIconHandle("package-install-local-package");
        private static ResourceHandle AddPackageSourceIcon = GetIconHandle("package-add-source");
        private static ResourceHandle DeletePackageSourceIcon = GetIconHandle("package-delete-source");

        private static PermissionType[] ActionPermissions = new PermissionType[] { PermissionType.Administrate, PermissionType.Configure };
        

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);


        public PackageElementProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }


        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            Element element = new Element(_context.CreateElementHandle(new PackageElementProviderRootEntityToken()));
            element.VisualData = new ElementVisualizedData
            {
                Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "RootFolderLabel"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "RootFolderToolTip"),
                HasChildren = true,
                Icon = RootClosedIcon,
                OpenedIcon = RootOpenedIcon
            };

            AddInstallLocalPackageAction(element);

            yield return element;
        }



        private static void AddInstallLocalPackageAction(Element element)
        {
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.InstallLocalPackageWorkflow"), ActionPermissions)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "InstallLocalPackageLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "InstallLocalPackageToolTip"),
                    Disabled = false,
                    Icon = InstallLocalPackageIcon,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken)
        {
            if ((entityToken is PackageElementProviderRootEntityToken))
            {
                return GetRootChildren(seachToken);
            }
            if ((entityToken is PackageElementProviderAvailablePackagesFolderEntityToken))
            {
                return GetAvailablePackagesFolderChildren(seachToken);
            }
            if ((entityToken is PackageElementProviderAvailablePackagesGroupFolderEntityToken))
            {
                var castedToken = entityToken as PackageElementProviderAvailablePackagesGroupFolderEntityToken;

                return GetAvailablePackageGroupFolderChildren(castedToken.GroupName, seachToken);
            }
            if ((entityToken is PackageElementProviderInstalledPackageFolderEntityToken))
            {
                return GetInstalledPackageFolderChildren(seachToken);
            }
            if ((entityToken is PackageElementProviderPackageSourcesFolderEntityToken))
            {
                return GetPackageSourcesFolderChildren(seachToken);
            }
            if ((entityToken is PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken))
            {
                return GetInstalledLocalPackagesFolderChildren(seachToken);
            }
            if ((entityToken is PackageElementProviderInstalledPackageGroupFolderEntityToken))
            {
                var castedToken = entityToken as PackageElementProviderInstalledPackageGroupFolderEntityToken;

                return GetInstalledPackageGroupFolderChildren(castedToken.GroupName, seachToken);
            }

            throw new InvalidOperationException("Unexpected entity token type: " + entityToken.GetType());
        }



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(IPackageServerSource)) continue;

                PackageElementProviderPackageSourcesFolderEntityToken newEntityToken = new PackageElementProviderPackageSourcesFolderEntityToken();

                result.Add(entityToken, new EntityToken[] { newEntityToken });
            }

            return result;
        }



        private IEnumerable<Element> GetRootChildren(SearchToken seachToken)
        {
            Element availablePackagesElement = new Element(_context.CreateElementHandle(new PackageElementProviderAvailablePackagesFolderEntityToken()));
            availablePackagesElement.VisualData = new ElementVisualizedData
            {
                Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "AvailablePackagesFolderLabel"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "AvailablePackagesFolderToolTip"),
                HasChildren = true,
                Icon = AvailablePackagesClosedIcon,
                OpenedIcon = AvailablePackagesOpenedIcon
            };
            availablePackagesElement.AddAction(new ElementAction(new ActionHandle(new ClearServerCacheActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ClearServerCacheLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ClearServerCacheToolTip"),
                    Disabled = false,
                    Icon = ClearServerCacheIcon,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });            
            yield return availablePackagesElement;



            Element installedPackagesElement = new Element(_context.CreateElementHandle(new PackageElementProviderInstalledPackageFolderEntityToken()));
            installedPackagesElement.VisualData = new ElementVisualizedData
            {
                Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "InstalledPackageFolderLabel"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "InstalledPackageFolderToolTip"),
                HasChildren = true,
                Icon = InstalledPackagesClosedIcon,
                OpenedIcon = InstalledPackagesOpenedIcon
            };
            yield return installedPackagesElement;



            Element packageSourcesElement = new Element(_context.CreateElementHandle(new PackageElementProviderPackageSourcesFolderEntityToken()));
            packageSourcesElement.VisualData = new ElementVisualizedData
            {
                Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "PackageSourcesFolderLabel"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "PackageSourcesFolderToolTip"),
                HasChildren = DataFacade.GetData<IPackageServerSource>().Count() > 0,
                Icon = PackageSourcesClosedIcon,
                OpenedIcon = PackageSourcesOpenedIcon
            };
            packageSourcesElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.AddPackageSourceWorkflow"), new PermissionType[] { PermissionType.Administrate })))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "AddPackageSourceLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "AddPackageSourceToolTip"),
                    Disabled = false,
                    Icon = AddPackageSourceIcon,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });
            yield return packageSourcesElement;
        }



        private IEnumerable<Element> GetAvailablePackagesFolderChildren(SearchToken seachToken)
        {
            IEnumerable<string> groupNames =
                (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                 select description.GroupName).Distinct();

            foreach (string groupName in groupNames.OrderBy(f=>f))
            {
                Element element = new Element(_context.CreateElementHandle(new PackageElementProviderAvailablePackagesGroupFolderEntityToken(groupName)));
                element.VisualData = new ElementVisualizedData
                {
                    Label = groupName,
                    ToolTip = groupName,
                    HasChildren = true,
                    Icon = AvailablePackagesGroupClosedIcon,
                    OpenedIcon = AvailablePackagesGroupOpenedIcon
                };                


                yield return element;
            }
        }



        private IEnumerable<Element> GetAvailablePackageGroupFolderChildren(string groupName, SearchToken seachToken)
        {
            IEnumerable<PackageDescription> packageDescriptions =
                (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                 where description.GroupName == groupName
                 orderby description.Name
                 select description);

            foreach (PackageDescription packageDescription in packageDescriptions)
            {
                ResourceHandle packageIcon = (packageDescription.PriceAmmount > 0 || packageDescription.AvailableInSubscriptions.Any( f=>f.Purchasable )
                    ? AvailableCommercialPackageItemIcon : AvailablePackageItemIcon);

                Element element = new Element(_context.CreateElementHandle(new PackageElementProviderAvailablePackagesItemEntityToken(
                    packageDescription.Id.ToString(),
                    packageDescription.GroupName)));
                element.VisualData = new ElementVisualizedData
                {
                    Label = packageDescription.Name,
                    ToolTip = packageDescription.Name,
                    HasChildren = false,
                    Icon = packageIcon,
                };

                if (!string.IsNullOrEmpty(packageDescription.ConsoleBrowserUrl))
                {
                    element.PropertyBag.Add("BrowserUrl", packageDescription.ConsoleBrowserUrl);
                    element.PropertyBag.Add("BrowserToolingOn", "false");
                }

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.ViewAvailablePackageInfoWorkflowWorkflow"), ActionPermissions)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ViewAvailableInformationLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ViewAvailableInformationToolTip"),
                        Icon = ViewInstalledInformationIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }

                    }
                });

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.InstallRemotePackageWorkflow"), ActionPermissions)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "InstallLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "InstallToolTip"),
                        Icon = InstallIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Add,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }

                    }
                });

                yield return element;
            }
        }



        private IEnumerable<Element> GetInstalledPackageFolderChildren(SearchToken seachToken)
        {
            bool hasLocalPackageChildren =
                (from info in PackageManager.GetInstalledPackages()
                 where info.IsLocalInstalled 
                 select info.Name).FirstOrDefault() != null;

            Element localPackagesElement = new Element(_context.CreateElementHandle(new PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken()));
            localPackagesElement.VisualData = new ElementVisualizedData
            {
                Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "LocalPackagesFolderLabel"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "LocalPackagesFolderToolTip"),
                HasChildren = hasLocalPackageChildren,
                Icon = LocalPackagesClosedIcon,
                OpenedIcon = LocalPackagesOpenedIcon
            };

            AddInstallLocalPackageAction(localPackagesElement);

            yield return localPackagesElement;


            IEnumerable<string> groupNames =
                (from info in PackageManager.GetInstalledPackages()
                 where info.IsLocalInstalled == false
                 orderby info.GroupName
                 select info.GroupName).Distinct();

            foreach (string groupName in groupNames)
            {
                Element element = new Element(_context.CreateElementHandle(new PackageElementProviderInstalledPackageGroupFolderEntityToken(groupName)));
                element.VisualData = new ElementVisualizedData
                {
                    Label = groupName,
                    ToolTip = groupName,
                    HasChildren = true,
                    Icon = InstalledPackagesGroupClosedIcon,
                    OpenedIcon = InstalledPackagesGroupOpenedIcon
                };

                yield return element;
            }
        }



        private IEnumerable<Element> GetPackageSourcesFolderChildren(SearchToken seachToken)
        {
            List<IPackageServerSource> packageServerSources = 
                (from a in DataFacade.GetData<IPackageServerSource>()
                 orderby a.Url
                 select a).ToList();

            foreach (IPackageServerSource packageServerSource in packageServerSources)
            {
                Element element = new Element(_context.CreateElementHandle(packageServerSource.GetDataEntityToken()));
                element.VisualData = new ElementVisualizedData
                {
                    Label = packageServerSource.Url,
                    ToolTip = packageServerSource.Url,
                    HasChildren = false,
                    Icon = PackageSourceItemClosedIcon
                };

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.DeletePackageSourceWorkflow"), new PermissionType[] { PermissionType.Administrate })))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "DeletePackageSourceLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "DeletePackageSourceToolTip"),
                        Icon = DeletePackageSourceIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Delete,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }

                    }
                });

                yield return element;
            }
        }



        private IEnumerable<Element> GetInstalledLocalPackagesFolderChildren(SearchToken seachToken)
        {
            IEnumerable<InstalledPackageInformation> installedPackageInformations =
                from info in PackageManager.GetInstalledPackages()
                where info.IsLocalInstalled 
                orderby info.Name
                select info;

            var allServerPackages = PackageSystemServices.GetAllAvailablePackages();

            foreach (InstalledPackageInformation installedPackageInformation in installedPackageInformations)
            {
                Element element = new Element(_context.CreateElementHandle(new PackageElementProviderInstalledPackageItemEntityToken(
                    installedPackageInformation.Id,
                    installedPackageInformation.GroupName,
                    installedPackageInformation.IsLocalInstalled,
                    installedPackageInformation.CanBeUninstalled)));

                PackageDescription serverPackageDescription = allServerPackages.Where(f => f.Id == installedPackageInformation.Id).FirstOrDefault();

                if (serverPackageDescription != null && !string.IsNullOrEmpty(serverPackageDescription.ConsoleBrowserUrl))
                {
                    element.PropertyBag.Add("BrowserUrl", serverPackageDescription.ConsoleBrowserUrl);
                    element.PropertyBag.Add("BrowserToolingOn", "false");
                }

                element.VisualData = new ElementVisualizedData
                {
                    Label = installedPackageInformation.Name,
                    ToolTip = installedPackageInformation.Name,
                    HasChildren = false,
                    Icon = GetIconForPackageItem(installedPackageInformation.Id),
                };

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.ViewInstalledPackageInfoWorkflow"), ActionPermissions)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ViewInstalledInformationLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ViewInstalledInformationToolTip"),
                        Icon = ViewInstalledInformationIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }

                    }
                });

                yield return element;
            }
        }

        private ResourceHandle GetIconForPackageItem(Guid packageId)
        {

            ResourceHandle icon = InstalledPackageItemIcon;
            PackageLicenseDefinition licenseDef = PackageLicenseHelper.GetLicenseDefinition(packageId);
            if (licenseDef != null && !licenseDef.Permanent)
            {
                icon = InstalledCommercialPackageItemIcon;
            }
            return icon;
        }


        private IEnumerable<Element> GetInstalledPackageGroupFolderChildren(string groupName, SearchToken seachToken)
        {
            IEnumerable<InstalledPackageInformation> installedPackageInformations =
                from info in PackageManager.GetInstalledPackages()
                where info.GroupName == groupName &&
                      info.IsLocalInstalled == false
                orderby info.Name
                select info;

            var allServerPackages = PackageSystemServices.GetAllAvailablePackages();

            foreach (InstalledPackageInformation installedPackageInformation in installedPackageInformations)
            {
                Element element = new Element(_context.CreateElementHandle(new PackageElementProviderInstalledPackageItemEntityToken(
                    installedPackageInformation.Id,
                    installedPackageInformation.GroupName,
                    installedPackageInformation.IsLocalInstalled,
                    installedPackageInformation.CanBeUninstalled)));

                PackageDescription serverPackageDescription = allServerPackages.Where(f => f.Id == installedPackageInformation.Id).FirstOrDefault();

                if (serverPackageDescription != null && !string.IsNullOrEmpty(serverPackageDescription.ConsoleBrowserUrl))
                {
                    element.PropertyBag.Add("BrowserUrl", serverPackageDescription.ConsoleBrowserUrl);
                    element.PropertyBag.Add("BrowserToolingOn", "false");
                }

                element.VisualData = new ElementVisualizedData
                {
                    Label = installedPackageInformation.Name,
                    ToolTip = installedPackageInformation.Name,
                    HasChildren = false,
                    Icon = GetIconForPackageItem(installedPackageInformation.Id),
                };

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PackageElementProvider.ViewInstalledPackageInfoWorkflow"), ActionPermissions)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ViewInstalledInformationLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PackageElementProvider", "ViewInstalledInformationToolTip"),
                        Icon = ViewInstalledInformationIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }

                    }
                });

                yield return element;
            }
        }




        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }        
    }


    [Assembler(typeof(NonConfigurableHooklessElementProviderAssembler))]
    internal sealed class PackageElementProviderData : HooklessElementProviderData
    {
    }
}
