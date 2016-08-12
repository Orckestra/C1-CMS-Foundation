using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;

using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.PageTemplates;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Data.Validation;
using Composite.Core.ResourceSystem;
using Composite.Core.Extensions;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Serialization;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private List<IPageType> _selectablePageTypes;

        private static class SortOrder
        {
            internal static string Bottom = "Bottom";
            internal static string Top = "Top";
            internal static string Relative = "Relative";
            internal static string Alphabetic = "Alphabetic";
        }

        public AddNewPageWorkflow()
        {
            InitializeComponent();
        }



        private Guid GetParentId()
        {
            if (this.EntityToken is PageElementProviderEntityToken)
            {
                return Guid.Empty;
            }

            if (this.EntityToken is DataEntityToken)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
                IPage selectedPage = (IPage)dataEntityToken.Data;

                return selectedPage.Id;
            }

            throw new NotSupportedException();
        }




        private List<IPageType> GetSelectablePageTypes()
        {
            if (_selectablePageTypes == null)
            {
                if (this.EntityToken is PageElementProviderEntityToken)
                {
                    _selectablePageTypes =
                        DataFacade.GetData<IPageType>().
                        Where(f => f.Available  && (f.HomepageRelation != PageTypeHomepageRelation.OnlySubPages.ToString())).
                        OrderBy(f => f.Name).
                        ToList();
                }
                else
                {
                    IPage page = this.GetDataItemFromEntityToken<IPage>();

                    _selectablePageTypes = page.GetChildPageSelectablePageTypes().ToList();
                }
            }

            return _selectablePageTypes;
        }



        private Guid? GetDefaultPageTypeId(ICollection<IPageType> selectablePageTypes)
        {
            if (!string.IsNullOrEmpty(Payload))
            {
                return ((IPage)SerializerHandlerFacade.Deserialize(Payload)).PageTypeId;
            }

            if (!(this.EntityToken is PageElementProviderEntityToken))
            {
                IPage parentPage = this.GetDataItemFromEntityToken<IPage>();

                IPageType parentPageType = DataFacade.GetData<IPageType>().FirstOrDefault(f => f.Id == parentPage.PageTypeId);

                if (parentPageType != null && parentPageType.DefaultChildPageType != Guid.Empty)
                {
                    if (selectablePageTypes.Any(f => f.Id == parentPageType.DefaultChildPageType))
                    {
                        return parentPageType.DefaultChildPageType;
                    }
                }
            }

            return selectablePageTypes.FirstOrDefault()?.Id;
        }



        private void MissingTemplateAlertActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("PageElementProvider.MissingTemplateTitle"),
                GetText("PageElementProvider.MissingTemplateMessage"));
        }



        private void MissingActiveLanguageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("PageElementProvider.MissingActiveLanguageTitle"),
                GetText("PageElementProvider.MissingActiveLanguageMessage"));
        }



        private void MissingPageTypeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            if (this.EntityToken is PageElementProviderEntityToken)
            {
                ShowMessage(
                    DialogType.Message,
                    GetText("PageElementProvider.MissingPageTypeTitle"),
                    GetText("PageElementProvider.MissingPageTypeHomepageMessage"));
            }
            else
            {
                ShowMessage(
                    DialogType.Message,
                    GetText("PageElementProvider.MissingPageTypeTitle"),
                    GetText("PageElementProvider.MissingPageTypeSubpageMessage"));
            }
        }



        private void RuleDontAllowPageAddCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("PageElementProvider.RuleDontAllowPageAddTitle"),
                GetText("PageElementProvider.RuleDontAllowPageAddMessage"));
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }

        private void CheckTemplatesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = PageTemplateFacade.ValidTemplateExists;
        }



        private void CheckActiveLanguagesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = UserSettings.ActiveLocaleCultureInfo != null;
        }



        private void CheckPageTypeExists(object sender, ConditionalEventArgs e)
        {
            PageTypeHomepageRelation relationToExclude;

            if (this.EntityToken is PageElementProviderEntityToken)
            {
                relationToExclude = PageTypeHomepageRelation.OnlySubPages;
            }
            else
            {
                relationToExclude = PageTypeHomepageRelation.OnlyHomePages;
            }

            e.Result = DataFacade.GetData<IPageType>()
                .Any(f => f.Available && f.HomepageRelation != relationToExclude.ToString());
        }



        private void CheckRulesAllowPageAddExists(object sender, ConditionalEventArgs e)
        {
            e.Result = GetSelectablePageTypes().Count > 0;
        }


        private void CheckPageTypesExist(object sender, ConditionalEventArgs e)
        {
            e.Result = GetSelectablePageTypes().Any();

            if (!e.Result)
            {
                ShowMessage(DialogType.Error,
                    GetText("PageElementProvider.NoPageTypesAvailableTitle"),
                    GetText("PageElementProvider.NoPageTypesAvailableMessage"));
            }
        }

        private bool ThereAreOtherPages()
        {
            foreach (var cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                using (new DataScope(PublicationScope.Unpublished, cultureInfo))
                {
                    if (DataFacade.GetData<IPageStructure>().Any())
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        private void stepInitialize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            Guid templateId;

            if (this.EntityToken is PageElementProviderEntityToken)
            {
                templateId = PageTemplateFacade.GetPageTemplates().Select(t => t.Id).FirstOrDefault();
            }
            else if (this.EntityToken is DataEntityToken)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
                IPage selectedPage = (IPage)dataEntityToken.Data;

                templateId = selectedPage.TemplateId;
            }
            else
            {
                throw new NotSupportedException();
            }


            List<IPageType> selectablePageTypes = GetSelectablePageTypes();

            Guid? pageTypeId = GetDefaultPageTypeId(selectablePageTypes);

            Verify.That(pageTypeId.HasValue, "Failed to get a page type");

            Guid parentId = GetParentId();

            string pageType = selectablePageTypes.First(f => f.Id == pageTypeId).Name;

            IPage newPage = DataFacade.BuildNew<IPage>();
            newPage.Id = Guid.NewGuid();
            newPage.TemplateId = templateId;
            newPage.PageTypeId = pageTypeId.Value;
            newPage.Title = "";
            newPage.MenuTitle = "";
            newPage.UrlTitle = "";
            newPage.FriendlyUrl = "";
            newPage.PublicationStatus = GenericPublishProcessController.Draft;



            int existingPagesCount = PageServices.GetChildrenCount(parentId);
            var sortOrder = new Dictionary<string, string>
            {
                {SortOrder.Bottom, GetText("AddNewPageStep1.LabelAddToBottom")}
            };
            if (existingPagesCount > 0)
            {
                sortOrder.Add(SortOrder.Top, GetText("AddNewPageStep1.LabelAddToTop"));
                if (existingPagesCount > 1)
                {
                    sortOrder.Add(SortOrder.Relative, GetText("AddNewPageStep1.LabelAddBelowOtherPage"));
                }

                bool isAlpabeticOrdered = PageServices.IsChildrenAlphabeticOrdered(parentId);
                if (isAlpabeticOrdered)
                {
                    sortOrder.Add(SortOrder.Alphabetic, GetText("AddNewPageStep1.LabelAddAlphabetic"));
                }
            }

            var bindings = new Dictionary<string, object>
            {
                {"NewPage", newPage},
                {"Title", string.Format(GetText("AddNewPageStep1.DialogLabelFormat"), pageType)},
                {"UrlTitleIsRequired", true},
                {"SortOrder", sortOrder},
                {"SelectedSortOrder", sortOrder.Keys.First()}
            };

            if (parentId == Guid.Empty)
            {
                bindings.Add("ShowCulture", true);
                bindings.Add("Cultures", DataLocalizationFacade.WhiteListedLocales
                                         .Select(f => new KeyValuePair<string, string>(f.Name, DataLocalizationFacade.GetCultureTitle(f))).ToList());
            }
            else
            {
                bindings.Add("ShowCulture", false);
            }

            this.Bindings = bindings;
        }


        private void CanSkipStep2(object sender, ConditionalEventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");
            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IPage));

            e.Result = this.GetBinding<string>("SelectedSortOrder") != SortOrder.Relative
                       && UrlTitleIsUniqueAmongSiblings()
                       && newPage.UrlTitle.Length <= dataTypeDescriptor.Fields["UrlTitle"].StoreType.MaximumLength
                       && newPage.MenuTitle.Length <= dataTypeDescriptor.Fields["MenuTitle"].StoreType.MaximumLength;
        }


        private void ValidateUrlTitle(object sender, ConditionalEventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            if (this.CurrentStateName == "step1State")
            {
                SetDefaultValues(newPage);
            }

            e.Result = true;

            if (!UrlTitleIsUniqueAmongSiblings())
            {
                string fieldName = "NewPage.UrlTitle";

                if (this.CurrentStateName == "step1State")
                {
                    fieldName = "NewPage.Title";
                }

                this.ShowFieldMessage(fieldName, GetText("UrlTitleNotUniqueError"));
                e.Result = false;
            }
            else
            {
                ValidationResults validationResults = ValidationFacade.Validate<IPage>(newPage);

                if (!validationResults.IsValid && validationResults.Any(f => f.Key == "UrlTitle"))
                {
                    this.ShowFieldMessage("NewPage.Title", "${Composite.Plugins.PageElementProvider, UrlTitleNotValidError}");
                    e.Result = false;
                }
            }

            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IPage));

            if (newPage.UrlTitle.Length > dataTypeDescriptor.Fields["UrlTitle"].StoreType.MaximumLength)
            {
                this.ShowFieldMessage("NewPage.UrlTitle", GetText("UrlTitleTooLong"));
                e.Result = false;
                return;
            }

            if (newPage.MenuTitle.Length > dataTypeDescriptor.Fields["MenuTitle"].StoreType.MaximumLength)
            {
                this.ShowFieldMessage("NewPage.MenuTitle", GetText("AddNewPageStep1.MenuTitleTooLong"));
                e.Result = false;
                return;
            }

        }



        private bool UrlTitleIsUniqueAmongSiblings()
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            var siblingPageUrlTitles =
                (from page in PageServices.GetChildren(GetParentId())
                 select page.UrlTitle).ToList();

            if (string.IsNullOrEmpty(newPage.UrlTitle) && ThereAreOtherPages())
            {
                newPage.UrlTitle = GenerateUrlTitleFromTitle(newPage.Title);

                if (string.IsNullOrEmpty(newPage.UrlTitle))
                {
                    return false;
                }
            }

            return !siblingPageUrlTitles.Any(urlTitle => urlTitle.Equals(newPage.UrlTitle, StringComparison.InvariantCultureIgnoreCase));
        }



        private void PrepareStep2_ExecuteCode(object sender, EventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            SetDefaultValues(newPage);

            if (this.GetBinding<string>("SelectedSortOrder") == SortOrder.Relative)
            {
                Dictionary<Guid, string> existingPages = PageServices.GetChildren(GetParentId()).ToDictionary(page => page.Id, page => page.Title);

                this.Bindings["ExistingPages"] = existingPages;
                this.Bindings["RelativeSelectedPageId"] = existingPages.First().Key;
            }
            else
            {
                this.Bindings.Remove("ExistingPages");
                this.Bindings.Remove("RelativeSelectedPageId");
            }
        }



        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IPage newPage = this.GetBinding<IPage>("NewPage");
            newPage.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;

            Guid pageTypeId = newPage.PageTypeId;
            Guid? defaultPageTemplateId = PageServices.GetDefaultPageTemplateId(pageTypeId);
            if (defaultPageTemplateId != null)
            {
                newPage.TemplateId = defaultPageTemplateId.Value;
            }

            string sortOrder = this.GetBinding<string>("SelectedSortOrder");

            Guid parentId = GetParentId();

            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                IPageInsertionPosition position;

                if (sortOrder == SortOrder.Top)
                {
                    position = PageInsertPosition.Top;
                }
                else if (sortOrder == SortOrder.Bottom)
                {
                    position = PageInsertPosition.Bottom;
                }
                else if (sortOrder == SortOrder.Alphabetic)
                {
                    position = PageInsertPosition.Alphabetic;
                }
                else if (sortOrder == SortOrder.Relative)
                {
                    Guid relativeSelectedPageId = this.GetBinding<Guid>("RelativeSelectedPageId");

                    position = PageInsertPosition.After(relativeSelectedPageId);
                }
                else
                {
                    throw new InvalidOperationException($"Not handled page instert position '{sortOrder}'");
                }

                newPage = newPage.Add(parentId, position);
            }

            SetSaveStatus(true);

            addNewTreeRefresher.PostRefreshMesseges(newPage.GetDataEntityToken());

            this.ExecuteWorklow(newPage.GetDataEntityToken(), typeof(EditPageWorkflow));
        }



        private string GenerateUrlTitleFromTitle(string title)
        {
            return UrlFormattersPluginFacade.FormatUrl(title.Trim(), false);
        }



        private void PresetCalculatedFields_ExecuteCode(object sender, EventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            SetDefaultValues(newPage);
        }

        /// <summary>
        /// Sets default values for "MenuTitle" and "UrlTitle" fields if they were not set.
        /// </summary>
        /// <param name="page">The page.</param>
        private void SetDefaultValues(IPage page)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");
            IPageType selectedPageType = DataFacade.GetData<IPageType>().Single(f => f.Id == newPage.PageTypeId);

            if (selectedPageType.PresetMenuTitle && page.MenuTitle.IsNullOrEmpty())
            {
                page.MenuTitle = page.Title;
            }

            if (page.UrlTitle.IsNullOrEmpty())
            {
                page.UrlTitle = GenerateUrlTitleFromTitle(page.Title);

                int i = 2;
                while (!UrlTitleIsUniqueAmongSiblings())
                {
                    page.UrlTitle = $"{GenerateUrlTitleFromTitle(page.Title)}{i}";
                    i++;
                }

            }
        }

        private void ValidateFirstPage(object sender, ConditionalEventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IPage));

            if (newPage.Title.Length > dataTypeDescriptor.Fields["Title"].StoreType.MaximumLength)
            {
                this.ShowFieldMessage("NewPage.Title", GetText("AddNewPageStep1.TitleTooLong"));
                e.Result = false;
                return;
            }

            e.Result = true;
        }
    }
}
