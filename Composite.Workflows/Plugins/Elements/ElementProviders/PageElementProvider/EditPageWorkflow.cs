using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using System.Xml.Linq;

using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Activities;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Types;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageWorkflow : FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish;

        public EditPageWorkflow()
        {
            InitializeComponent();
            InitializeExtensions();
        }

        private static DataTypeDescriptorFormsHelper CreateDataTypeDescriptorFormsHelper(IPageMetaDataDefinition pageMetaDataDefinition, DataTypeDescriptor dataTypeDescriptor)
        {
            var bindingPrefix = $"{pageMetaDataDefinition.Name}:{dataTypeDescriptor.Namespace}.{dataTypeDescriptor.Name}";

            var helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, bindingPrefix);

            var generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            helper.FieldGroupLabel = StringResourceSystemFacade.ParseString(pageMetaDataDefinition.Label);

            return helper;
        }



        private List<KeyValuePair<Guid, string>> GetSelectablePageTypes()
        {
            var selectedPage = GetBinding<IPage>("SelectedPage");

            var parentPageId = selectedPage.GetParentId();
            IPage parentPage = null;
            if (parentPageId != Guid.Empty)
            {
                parentPage = PageManager.GetPageById(parentPageId);
            }

            return
                parentPage.GetChildPageSelectablePageTypes(selectedPage).
                Select(f => new KeyValuePair<Guid, string>(f.Id, f.Name)).
                ToList();
        }



        private List<KeyValuePair<Guid, string>> GetSelectablePageTemplates()
        {
            var selectedPage = GetBinding<IPage>("SelectedPage");

            var allPageTemplates = PageTemplateFacade.GetPageTemplates().ToList();

            var templateRestrictions =
                DataFacade.GetData<IPageTypePageTemplateRestriction>()
                .Where(f => f.PageTypeId == selectedPage.PageTypeId)
                .Select(restriction => restriction.PageTemplateId)
                .ToList();

            IEnumerable<PageTemplateDescriptor> result;

            if (templateRestrictions.Any())
            {
                var allowedTemplatesHash = new HashSet<Guid>(templateRestrictions);

                var allowedTemplates =
                    allPageTemplates
                    .Where(template => allowedTemplatesHash.Contains(template.Id))
                    .ToList();

                var selectedTemplateId = selectedPage.TemplateId;
                var selectedTemplate = allPageTemplates.FirstOrDefault(t => t.Id == selectedTemplateId);
                if (selectedTemplate != null
                    & !allowedTemplates.Any(t => t.Id == selectedTemplateId))
                {
                    allowedTemplates.Add(selectedTemplate);
                }

                result = allowedTemplates;
            }
            else
            {
                result = allPageTemplates;
            }

            return result
                   .OrderBy(template => template.Title)
                   .Select(f => new KeyValuePair<Guid, string>(f.Id, f.Title)).ToList();
        }



        private void editStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish))
            {
                var formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                    formData.ExcludedEvents = new List<string>();

                formData.ExcludedEvents.Add("SaveAndPublish");
            }


            IPage selectedPage;
            if (!BindingExist("SelectedPage"))
            {
                selectedPage = GetDataItemFromEntityToken<IPage>();

                if (selectedPage.PublicationStatus == GenericPublishProcessController.Published)
                {
                    selectedPage.PublicationStatus = GenericPublishProcessController.Draft;
                }
                Bindings.Add("SelectedPage", selectedPage);
            }
            else
            {
                selectedPage = GetBinding<IPage>("SelectedPage");
            }

            if (!BindingExist("UrlTitleIsRequired"))
            {
                var isRootPage = PageManager.GetParentId(selectedPage.Id) == Guid.Empty;

                Bindings["UrlTitleIsRequired"] = !isRootPage;
                Bindings["IsRootPage"] = isRootPage;
            }

            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(@"\Administrative\EditPage.xml");

            XDocument formDocument;
            using (var reader = markupProvider.GetReader())
            {
                formDocument = XDocument.Load(reader);
            }

            var bindingsXElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Bindings);
            var layoutXElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Layout);
            var tabPanelsXElement = layoutXElement.Element(DataTypeDescriptorFormsHelper.MainNamespace + "TabPanels");


            IEnumerable<ICompositionContainer> compositionContainers = selectedPage.GetAllowedMetaDataContainers().Evaluate();

            var compositionTabs = new Dictionary<Guid, XElement>();

            foreach (var compositionContainer in compositionContainers)
            {
                var element = new XElement(Namespaces.BindingFormsStdUiControls10 + "PlaceHolder");
                element.Add(new XAttribute("Label", StringResourceSystemFacade.ParseString(compositionContainer.Label)));

                compositionTabs.Add(compositionContainer.Id, element);
            }

            var clientValidationRules = new Dictionary<string, List<ClientValidationRule>>();

            var pageMetaDataDefinitions = selectedPage.GetAllowedMetaDataDefinitions();

            foreach (var pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                var metaDatTypeId = pageMetaDataDefinition.MetaDataTypeId;

                var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDatTypeId);
                Verify.IsNotNull(dataTypeDescriptor, "Failed to get meta data type by id '{0}'. If data type was purposely removed, in order to fix this exception you should remove IPageMetaDataDefinition records that reference this data type.", metaDatTypeId);

                var metaDataType = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
                Verify.IsNotNull(metaDataType, "Failed to get meta data type '{0}', id: {1}. If it has been removed, references from '{2}' have to be removed as well",
                                                dataTypeDescriptor.TypeManagerTypeName, metaDatTypeId, typeof(IPageMetaDataDefinition).Name);

                var helper = CreateDataTypeDescriptorFormsHelper(pageMetaDataDefinition, dataTypeDescriptor);

                var metaData = selectedPage.GetMetaData(pageMetaDataDefinition.Name, metaDataType);
                if (metaData == null)
                {
                    metaData = DataFacade.BuildNew(metaDataType);

                    PageMetaDataFacade.AssignMetaDataSpecificValues(metaData, pageMetaDataDefinition.Name, selectedPage);

                    var localizedData = metaData as ILocalizedControlled;
                    if (localizedData != null)
                    {
                        localizedData.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                    }

                    var publishControlled = metaData as IPublishControlled;
                    publishControlled.PublicationStatus = GenericPublishProcessController.Draft;

                    helper.UpdateWithNewBindings(Bindings);
                    helper.ObjectToBindings(metaData, Bindings);
                }
                else
                {
                    helper.UpdateWithBindings(metaData, Bindings);
                }


                bindingsXElement.Add(helper.BindingXml.Elements());
                compositionTabs[pageMetaDataDefinition.MetaDataContainerId].Add(helper.PanelXml);

                clientValidationRules.AddDictionary(helper.GetBindingsValidationRules(metaData));
            }


            var previewTabPanel = tabPanelsXElement.Elements().Last();

            foreach (var element in compositionTabs.Values)
            {
                previewTabPanel.AddBeforeSelf(element);
            }



            IDictionary<string, string> transitionNames = new Dictionary<string, string>();
            transitionNames.Add(GenericPublishProcessController.Draft, StringResourceSystemFacade.GetString("Composite.Management", "PublishingStatus.draft"));
            transitionNames.Add(GenericPublishProcessController.AwaitingApproval, StringResourceSystemFacade.GetString("Composite.Management", "PublishingStatus.awaitingApproval"));

            var username = UserValidationFacade.GetUsername();
            var userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(username);
            var userGroupPermissionDefinitions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(username);
            var currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(UserValidationFacade.GetUserToken(), EntityToken, userPermissionDefinitions, userGroupPermissionDefinitions);
            foreach (var permissionType in currentPermissionTypes)
            {
                if (GenericPublishProcessController.AwaitingPublicationActionPermissionType.Contains(permissionType))
                {
                    transitionNames.Add(GenericPublishProcessController.AwaitingPublication, StringResourceSystemFacade.GetString("Composite.Management", "PublishingStatus.awaitingPublication"));
                    break;
                }
            }


            var contents = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == selectedPage.Id && f.VersionId == selectedPage.VersionId).ToList();
            var namedXhtmlFragments = contents.ToDictionary(content => content.PlaceHolderId, content => content.Content ?? "");


            UpdateBinding("SelectablePageTypeIds", GetSelectablePageTypes());
            UpdateBinding("SelectableTemplateIds", GetSelectablePageTemplates());
            UpdateBinding("NamedXhtmlFragments", namedXhtmlFragments);
            UpdateBinding("StateOptions", transitionNames);


            var formDefinition = formDocument.GetDocumentAsString();

            DeliverFormData(
                    selectedPage.Title,
                    StandardUiContainerTypes.Document,
                    formDefinition,
                    Bindings,
                    clientValidationRules
                );
        }



        private void newPageTypeSelectedCodeActivity_UpdateView_ExecuteCode(object sender, EventArgs e)
        {
            RerenderView();
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var updateTreeRefresher = CreateUpdateTreeRefresher(EntityToken);

            var selectedPage = GetBinding<IPage>("SelectedPage");
            var originalPage = DataFacade.GetData<IPage>(f => f.Id == selectedPage.Id && f.VersionId == selectedPage.VersionId).SingleOrDefault();

            var viewLabelUpdated = originalPage == null
                || selectedPage.MenuTitle != originalPage.MenuTitle
                || selectedPage.Title != originalPage.Title;

            var treeviewRequiresRefreshing = false;

            var dataToAdd = new Dictionary<string, IData>();
            var dataToUpdate = new Dictionary<string, IData>();

            var dataValidated = true;

            try
            {
                using (var transactionScope = TransactionsFacade.CreateNewScope())
                {
                    dataValidated = PrepareAddUpdateMetaData(selectedPage, dataToAdd, dataToUpdate);

                    if (dataValidated)
                    {
                        if (selectedPage.PageTypeId != originalPage.PageTypeId)
                        {
                            // Adding metadata fields
                            var oldPageMetaDataDefinitions = originalPage.GetAllowedMetaDataDefinitions().Except(selectedPage.GetAllowedMetaDataDefinitions(), new PageMetaDataDefinitionEqualityComparer());

                            foreach (var pageMetaDataDefinition in oldPageMetaDataDefinitions)
                            {
                                var oldMetaData = selectedPage.GetMetaData(pageMetaDataDefinition.Name, pageMetaDataDefinition.MetaDataTypeId);
                                if (oldMetaData != null)
                                {
                                    ProcessControllerFacade.FullDelete(oldMetaData);
                                }
                            }

                            bool newDataAdded = PageServices.AddPageTypePageFoldersAndApplications(selectedPage);

                            if (newDataAdded)
                            {
                                treeviewRequiresRefreshing = true;
                            }
                        }


                        foreach (var data in dataToAdd.Values)
                        {
                            DataFacade.AddNew(data);
                        }

                        foreach (var data in dataToUpdate.Values)
                        {
                            var publishControlled = data as IPublishControlled;
                            publishControlled.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.Update(data);
                        }

                        treeviewRequiresRefreshing |= (originalPage.Title != selectedPage.Title) ||
                                                   (originalPage.Description != selectedPage.Description) ||
                                                   (originalPage.PublicationStatus != selectedPage.PublicationStatus);

                        // NOTE: updating originalPage object, in order to make XML & SQL provider work in the same way
                        originalPage.TemplateId = selectedPage.TemplateId;
                        originalPage.PageTypeId = selectedPage.PageTypeId;
                        originalPage.Title = selectedPage.Title;
                        originalPage.MenuTitle = selectedPage.MenuTitle;
                        originalPage.UrlTitle = selectedPage.UrlTitle;
                        originalPage.FriendlyUrl = selectedPage.FriendlyUrl;
                        originalPage.Description = selectedPage.Description;
                        originalPage.PublicationStatus = selectedPage.PublicationStatus;
                        originalPage.SourceCultureName = selectedPage.SourceCultureName;
                        DataFacade.Update(originalPage);

                        var contentDictionary = GetBinding<Dictionary<string, string>>("NamedXhtmlFragments");
                        var existingContents = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == selectedPage.Id && f.VersionId == selectedPage.VersionId).ToList();

                        foreach (var existingContent in existingContents)
                        {
                            if (contentDictionary.ContainsKey(existingContent.PlaceHolderId))
                            {
                                existingContent.Content = contentDictionary[existingContent.PlaceHolderId];
                                existingContent.PublicationStatus = GenericPublishProcessController.Draft;
                                DataFacade.Update(existingContent);
                            }
                            else
                            {
                                DataFacade.Delete(existingContent);
                            }
                        }

                        foreach (var contentDictionaryElement in contentDictionary.Where(f => existingContents.Any(existing => existing.PlaceHolderId == f.Key) == false))
                        {
                            var newContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                            newContent.PageId = selectedPage.Id;
                            newContent.VersionId = selectedPage.VersionId;
                            newContent.PlaceHolderId = contentDictionaryElement.Key;
                            newContent.Content = contentDictionaryElement.Value;
                            newContent.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                            newContent.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.AddNew(newContent);
                        }
                    }

                    transactionScope.Complete();
                }

                if (_doPublish)
                {
                    var actionToken = new GenericPublishProcessController.PublishActionToken();

                    var serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

                    ActionExecutorFacade.Execute(EntityToken, actionToken, serviceContainer);

                    treeviewRequiresRefreshing = false;
                }

                if (treeviewRequiresRefreshing)
                {
                    updateTreeRefresher.PostRefreshMesseges(selectedPage.GetDataEntityToken());
                }

                UpdateBinding("OldPublicationStatus", selectedPage.PublicationStatus);

                if (viewLabelUpdated)
                {
                    RerenderView();
                }
            }
            catch (Exception ex)
            {
                var mostSpecificException = ex;
                while (mostSpecificException.InnerException != null) mostSpecificException = mostSpecificException.InnerException;
                ShowMessage(DialogType.Error, "Save failed", $"Save failed: {mostSpecificException.Message}");
                Log.LogError("Page save", ex);
            }
            finally
            {
                SetSaveStatus(dataValidated);
            }
        }



        private bool PrepareAddUpdateMetaData(IPage selectedPage, IDictionary<string, IData> dataToAdd, IDictionary<string, IData> dataToUpdate)
        {
            var isValid = ValidateBindings();

            IEnumerable<IPageMetaDataDefinition> pageMetaDataDefinitions = selectedPage.GetAllowedMetaDataDefinitions().Evaluate();

            foreach (var pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageMetaDataDefinition.MetaDataTypeId);
                var metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

                var helper = CreateDataTypeDescriptorFormsHelper(pageMetaDataDefinition, dataTypeDescriptor);

                var metaData = selectedPage.GetMetaData(pageMetaDataDefinition.Name, metaDataType);
                if (metaData == null)
                {
                    var newData = DataFacade.BuildNew(metaDataType);

                    PageMetaDataFacade.AssignMetaDataSpecificValues(newData, pageMetaDataDefinition.Name, selectedPage);

                    var localizedData = newData as ILocalizedControlled;
                    if (localizedData != null)
                    {
                        localizedData.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                    }

                    if (!BindAndValidate(helper, newData))
                    {
                        isValid = false;
                    }

                    dataToAdd.Add(helper.BindingNamesPrefix, newData);
                }
                else
                {
                    if (!BindAndValidate(helper, metaData))
                    {
                        isValid = false;
                    }

                    dataToUpdate.Add(helper.BindingNamesPrefix, metaData);
                }
            }


            var pageValidationResults = ValidationFacade.Validate(selectedPage);

            if (!pageValidationResults.IsValid)
            {
                isValid = false;
            }


            foreach (var kvp in dataToAdd.Concat(dataToUpdate))
            {
                var validationResults = ValidationFacade.Validate(kvp.Value);

                if (!validationResults.IsValid)
                {
                    isValid = false;

                    foreach (var result in validationResults)
                    {
                        ShowFieldMessage(DataTypeDescriptorFormsHelper.GetBindingName(kvp.Key, result.Key), result.Message);
                    }
                }
            }

            return isValid;
        }


        private void editPreviewCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            var webRenderService = serviceContainer.GetService<IFormFlowWebRenderingService>();

            try
            {
                var selectedPage = GetBinding<IPage>("SelectedPage");

                var contents = new List<IPagePlaceholderContent>();
                var namedXhtmlFragments = GetBinding<Dictionary<string, string>>("NamedXhtmlFragments");
                foreach (var placeHolderContent in namedXhtmlFragments)
                {
                    var content = DataFacade.BuildNew<IPagePlaceholderContent>();
                    content.PageId = selectedPage.Id;
                    content.VersionId = selectedPage.VersionId;
                    content.PlaceHolderId = placeHolderContent.Key;
                    content.Content = placeHolderContent.Value;
                    contents.Add(content);
                }

                var output = PagePreviewBuilder.RenderPreview(selectedPage, contents);
                webRenderService.SetNewPageOutput(new LiteralControl(output));
            }
            catch (Exception ex)
            {
                Control errOutput = new LiteralControl("<pre>" + ex + "</pre>");
                webRenderService.SetNewPageOutput(errOutput);
            }
        }



        private static void TrimFieldValues(IPage page)
        {
            page.Title = page.Title.Trim();
            page.MenuTitle = page.MenuTitle.Trim();
            page.UrlTitle = page.UrlTitle.Trim();
            page.FriendlyUrl = page.FriendlyUrl?.Trim();
        }


        private bool FieldHasValidLength(string fieldValue, string fieldName, int maximumLength)
        {
            if (fieldValue.Length <= maximumLength)
            {
                return true;
            }

            var bindingName = "SelectedPage." + fieldName;

            ShowFieldMessage(bindingName, GetText("EditPage.MaxLength").FormatWith(maximumLength));
            return false;
        }

        private void ValidateSave(object sender, ConditionalEventArgs e)
        {
            var selectedPage = GetBinding<IPage>("SelectedPage");

            selectedPage.MenuTitle = selectedPage.MenuTitle ?? string.Empty;
            selectedPage.FriendlyUrl = selectedPage.FriendlyUrl ?? string.Empty;

            TrimFieldValues(selectedPage);

            if (!FieldHasValidLength(selectedPage.Title, "Title", 255)
                || !FieldHasValidLength(selectedPage.MenuTitle, "MenuTitle", 64)
                || !FieldHasValidLength(selectedPage.UrlTitle, "UrlTitle", 64)
                || !FieldHasValidLength(selectedPage.FriendlyUrl, "FriendlyUrl", 64))
            {
                e.Result = false;
                return;
            }

            e.Result = true;

            var processedUrlTitle = UrlFormattersPluginFacade.FormatUrl(selectedPage.UrlTitle, true);
            if (selectedPage.UrlTitle != processedUrlTitle)
            {
                RerenderView();
                selectedPage.UrlTitle = processedUrlTitle;
                ShowMessage(DialogType.Message,
                    GetText("EditPage.UrlTitleFormattedTitle"),
                    (GetText("EditPage.UrlTitleFormattedMessage") ?? string.Empty).FormatWith(processedUrlTitle));
            }

            var siblingPageUrlTitles =
                (from page in PageServices.GetChildren(selectedPage.GetParentId())
                 where page.Id != selectedPage.Id
                 select page.UrlTitle).ToList();

            foreach (var siblingUrlTitle in siblingPageUrlTitles)
            {
                if (siblingUrlTitle.Equals(selectedPage.UrlTitle, StringComparison.InvariantCultureIgnoreCase))
                {
                    ShowFieldMessage("SelectedPage.UrlTitle", "${Composite.Plugins.PageElementProvider, UrlTitleNotUniqueError}");
                    e.Result = false;
                    break;
                }
            }

            if (string.IsNullOrEmpty(selectedPage.FriendlyUrl) == false)
            {
                var usedFriendlyUrls = DataFacade.GetData<IPage>(f => f.FriendlyUrl != null && f.FriendlyUrl != string.Empty && f.Id != selectedPage.Id).Select(f => f.FriendlyUrl).ToList();

                if (usedFriendlyUrls.Any(f => f.Equals(selectedPage.FriendlyUrl, StringComparison.InvariantCultureIgnoreCase)))
                {
                    ShowFieldMessage("SelectedPage.FriendlyUrl", "${Composite.Plugins.PageElementProvider, FriendlyUrlNotUniqueError}");
                    e.Result = false;
                }
            }

            if (string.IsNullOrEmpty(selectedPage.Title))
            {
                ShowFieldMessage("SelectedPage.Title", "${Composite.Plugins.PageElementProvider, TitleMissingError}");
                e.Result = false;
            }

            var validationResults = ValidationFacade.Validate(selectedPage);
            if (!validationResults.IsValid)
            {
                if (validationResults.Any(f => f.Key == "UrlTitle"))
                {
                    ShowFieldMessage("SelectedPage.UrlTitle", "${Composite.Plugins.PageElementProvider, UrlTitleNotValidError}");
                    e.Result = false;
                }

                foreach (var validationResult in validationResults.Where(f => f.Key != "UrlTitle"))
                {
                    ShowFieldMessage("SelectedPage." + validationResult.Key, validationResult.Message);
                }
            }

            if (!ValidateBindings())
            {
                e.Result = false;
            }
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }


        private void PageStillExists(object sender, ConditionalEventArgs e)
        {
            var selectedPage = GetBinding<IPage>("SelectedPage");
            var originalPage = DataFacade.GetData<IPage>(f => f.Id == selectedPage.Id && f.VersionId == selectedPage.VersionId).SingleOrDefault();

            e.Result = originalPage != null;
        }


        private void setToPublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}