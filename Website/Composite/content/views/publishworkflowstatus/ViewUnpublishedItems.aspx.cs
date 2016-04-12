using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;


public partial class ViewUnpublishedItems : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
        {
            XElement infoDocumentRoot = new XElement("ActionItems");

            if (Request.QueryString["showpagedata"]=="true")
            {
                AttachPageElements(infoDocumentRoot);
            }
            if (Request.QueryString["showglobaldata"] == "true")
            {
                AttachGlobalDataElements(infoDocumentRoot);
            }

            if (infoDocumentRoot.Elements().Any()==true)
            {
                XDocument newTree = TransformMarkup(infoDocumentRoot);

                visualOutput.Controls.Add(new LiteralControl(newTree.ToString()));
            }
            else
            {
                emptyLabelPlaheHolder.Visible = true;
            }
        }
    }


    private void AttachPageElements(XElement infoDocumentRoot)
    {
        XName pageName = "Page";

        List<IPage> actionRequiredPages =
            (from page in DataFacade.GetData<IPage>()
             where page.PublicationStatus != "published"
             select page).ToList();

        //            Dictionary<Type, List<IPublishControlled>> unpublishedData = GetDataRequiringAction();
        List<Type> pageFolderTypes = new List<Type>();
        Dictionary<Guid, List<IPublishControlled>> pageFolderDataItems = new Dictionary<Guid, List<IPublishControlled>>();

        // Add pages that lead to page folder

        Dictionary<Type, List<IPublishControlled>> unpublishedPageFolderData = GetDataRequiringAction(PageFolderFacade.GetAllFolderTypes());
        foreach (var unpublishedDataGroup in unpublishedPageFolderData)
        {
            Type dataType = unpublishedDataGroup.Key;
            if (PageFolderFacade.GetAllFolderTypes().Contains(dataType))
            {
                if (dataType.GetDataPropertyRecursively("IPageIdForeignKey") != null)
                {
                    pageFolderTypes.Add(dataType);

                    foreach (IPublishControlled data in unpublishedDataGroup.Value)
                    {
                        IPage page = (IPage)data.GetReferenced("IPageIdForeignKey");
                        if (!actionRequiredPages.Any(f => f.Id == page.Id))
                        {
                            actionRequiredPages.Add(page);
                        }

                        if (!pageFolderDataItems.ContainsKey(page.Id))
                        {
                            pageFolderDataItems.Add(page.Id, new List<IPublishControlled>());
                        }

                        pageFolderDataItems[page.Id].Add(data);
                    }
                }
            }
        }


        UserToken userToken = UserValidationFacade.GetUserToken();
        List<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username).ToList();
        List<UserGroupPermissionDefinition> userGroupPermissionDefinitions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username).ToList();

        foreach (IPage page in actionRequiredPages.ToList())
        {
            DataEntityToken entityToken = page.GetDataEntityToken();
            var permissions = PermissionTypeFacade.GetCurrentPermissionTypes(userToken, entityToken, userPermissionDefinitions, userGroupPermissionDefinitions).ToList();

            if (permissions.Contains(PermissionType.Read) == false)
            {
                actionRequiredPages.Remove(page);
            }
        }


        var allSitemapElements = PageStructureInfo.GetSiteMap().DescendantsAndSelf();
        var relevantElements = allSitemapElements.Where(f => actionRequiredPages.Any(g => g.Id.ToString() == f.Attribute("Id").Value));
        var minimalTree = relevantElements.AncestorsAndSelf().Distinct().ToList();

        var documentOrdered = minimalTree.InDocumentOrder().Where(f => f.Name.LocalName == "Page").ToList();


        int preDepth = 0;

        XName actionPageName = "Page";

        Stack<XElement> workingContainerStack = new Stack<XElement>();
        workingContainerStack.Push(infoDocumentRoot);
        XElement lastActionPageElement = null;

        foreach (XElement pageElement in documentOrdered)
        {
            int depth = pageElement.Ancestors().Count(f => f.Name.LocalName == "Page");

            if (preDepth == depth - 1)
            {
                workingContainerStack.Push(lastActionPageElement);
                preDepth++;
            }
            else if (preDepth > depth)
            {
                while (preDepth != depth)
                {
                    workingContainerStack.Pop();
                    preDepth--;
                }
            }
            else if (depth != preDepth)
            {
                throw new InvalidOperationException("Unexpected depth jump in document ordered minimal tree.");
            }

            Guid pageId = new Guid(pageElement.Attribute("Id").Value);

            var statusInfo = actionRequiredPages.FirstOrDefault(f => f.Id == pageId);
            string statusString = (statusInfo == null ? "published" : statusInfo.PublicationStatus);

            XElement actionPage = new XElement(actionPageName,
                new XAttribute("Id", pageId),
                new XAttribute("Title", pageElement.Attribute("Title").Value),
                new XAttribute("Status", statusString)
                );


            if (statusInfo != null)
            {
                actionPage.Add(
                    new XAttribute("changedate", statusInfo.ChangeDate.ToShortDateString() + " " + statusInfo.ChangeDate.ToShortTimeString()),
                    new XAttribute("changedby", statusInfo.ChangedBy ?? "?"));
            }

            // Inject page folder data
            if (pageFolderDataItems.ContainsKey(pageId))
            {
                foreach (Type t in pageFolderDataItems[pageId].Select(f => f.GetType()).Distinct().OrderBy(f => f.GetTypeTitle()))
                {
                    XElement pageFolderElement = new XElement("PageFolder",
                        new XAttribute("Title", t.GetTypeTitle()));

                    foreach (IPublishControlled dataItem in pageFolderDataItems[pageId].Where(f => f.GetType() == t))
                    {
                        pageFolderElement.Add(new XElement("DataItem",
                            new XAttribute("Title", dataItem.GetLabel()),
                            new XAttribute("Status", dataItem.PublicationStatus)));
                    }

                    actionPage.Add(pageFolderElement);
                }
            }

            workingContainerStack.Peek().Add(actionPage);
            lastActionPageElement = actionPage;
        }

        while (workingContainerStack.Count > 1)
        {
            workingContainerStack.Pop();
        }

//        XElement inputRoot = workingContainerStack.Peek();
    }



    private void AttachGlobalDataElements(XElement inputRoot)
    {
        XElement dataGroupsElement = new XElement("DataTypes");
        Dictionary<Type, List<IPublishControlled>> unpublishedGlobalData = GetDataRequiringAction(GetGlobalDataTypes());

        foreach (var unpublishedDataGroup in unpublishedGlobalData)
        {
            XElement dataGroupElement = new XElement("DataType",
                new XAttribute("Title", unpublishedDataGroup.Key.GetTypeTitle()));

            foreach (IPublishControlled dataItem in unpublishedDataGroup.Value)
            {
                dataGroupElement.Add(new XElement("DataItem",
                    new XAttribute("Title", dataItem.GetLabel()),
                    new XAttribute("Status", dataItem.PublicationStatus)));
            }
            dataGroupsElement.Add(dataGroupElement);
        }
        if (dataGroupsElement.Elements().Any())
        {
            inputRoot.Add(dataGroupsElement);
        }
    }



    private XDocument TransformMarkup(XElement inputRoot)
    {
        XDocument newTree = new XDocument();
        using (XmlWriter writer = newTree.CreateWriter())
        {
            
            XslCompiledTransform xslTransformer = new XslCompiledTransform();
            xslTransformer.LoadFromPath(this.MapPath("ViewUnpublishedItems.xslt"));

            xslTransformer.Transform(inputRoot.CreateReader(), writer);
        }


        return newTree;
    }



    private static Dictionary<Type, List<IPublishControlled>> GetDataRequiringAction(IEnumerable<Type> dataTypesToQuery)
    {
        Dictionary<Type, List<IPublishControlled>> unpublishedData = new Dictionary<Type, List<IPublishControlled>>();

        UserToken userToken = UserValidationFacade.GetUserToken();
        List<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(userToken.Username).ToList();
        List<UserGroupPermissionDefinition> userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(userToken.Username).ToList();

        foreach (Type t in dataTypesToQuery)
        {
            if (typeof(IPublishControlled).IsAssignableFrom(t))
            {
                Type dataLoaderType = typeof(DataLoader<>).MakeGenericType(new Type[] { t });
                IDataLoader dataLoader = (IDataLoader)Activator.CreateInstance(dataLoaderType);

                List<IPublishControlled> actionRequiredData = dataLoader.GetUnPublishedData().ToList();

                foreach (IPublishControlled dataItem in actionRequiredData.ToList())
                {
                    DataEntityToken entityToken = dataItem.GetDataEntityToken();
                    var permissions = PermissionTypeFacade.GetCurrentPermissionTypes(userToken, entityToken, userPermissionDefinitions, userGroupPermissionDefinition).ToList();

                    if (permissions.Contains(PermissionType.Read) == false)
                    {
                        actionRequiredData.Remove(dataItem);
                    }
                }

                if (actionRequiredData.Any() == true)
                {
                    unpublishedData.Add(t, actionRequiredData);
                }
            }
        }
        return unpublishedData;
    }




    private IEnumerable<Type> GetGlobalDataTypes()
    {
        Func<Type, bool> typePredicate = f => (f != typeof(IPage)) && (PageFolderFacade.GetAllFolderTypes().Contains(f) == false) && (PageMetaDataFacade.GetAllMetaDataTypes().Contains(f) == false);

        return DataFacade.GetGeneratedInterfaces().Where(typePredicate).OrderBy(t => t.FullName);
    }






    /* 
     * Helper types
     * */
    public interface IDataLoader
    {
        IQueryable<IPublishControlled> GetUnPublishedData();
    }



    private class DataLoader<T> : IDataLoader where T : class, IPublishControlled
    {
        IQueryable<IPublishControlled> IDataLoader.GetUnPublishedData()
        {
            return DataFacade.GetData<T>(f => f.PublicationStatus != "published").Cast<IPublishControlled>();
        }
    }
}
