using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Caching;
using Composite.Data.Streams;
using Composite.Data.Types;
using Composite.Types;


namespace Composite.Renderings.Template
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class TemplateInfo
	{
        private static readonly Cache<Guid, IPageTemplate> PageTemplateCache = new Cache<Guid, IPageTemplate>("Page templates", 100);

        static TemplateInfo() {
	      DataEventSystemFacade.SubscribeToDataAfterUpdate<IPageTemplate>(PageTemplate_Changed, true);
          DataEventSystemFacade.SubscribeToDataDeleted<IPageTemplate>(PageTemplate_Changed);
	    }

	    private static void PageTemplate_Changed(DataEventArgs dataEventArgs)
	    {
            var pageTemplate = dataEventArgs.Data as IPageTemplate;
            Verify.ArgumentCondition(pageTemplate != null, "dataEventArgs", "Data is null or has an incorrect data type.");
            PageTemplateCache.Remove(pageTemplate.Id);
	    }


	    public static TemplatePlaceholdersInfo GetRenderingPlaceHolders(Guid templateId)
        {
            XDocument document = GetTemplateDocument(templateId);
            IEnumerable<XElement> placeHoldersWithId = document.Descendants(RenderingElementNames.PlaceHolder).Where( e=>e.Attribute(RenderingElementNames.PlaceHolderIdAttribute)!=null);

            TemplatePlaceholdersInfo info = new TemplatePlaceholdersInfo();

            info.Placeholders = (
                from placeHolder in placeHoldersWithId
                orderby GetPlaceHolderTitle(placeHolder)
                select new KeyValuePair(
                    placeHolder.Attribute(RenderingElementNames.PlaceHolderIdAttribute).Value,
                    GetPlaceHolderTitle(placeHolder))).ToList();

            XAttribute defaultTrueAttribute = placeHoldersWithId.Attributes(RenderingElementNames.PlaceHolderDefaultAttribute).Where(a => a.Value == "true").FirstOrDefault();

            if (defaultTrueAttribute != null)
            {
                info.DefaultPlaceholderId = defaultTrueAttribute.Parent.Attribute(RenderingElementNames.PlaceHolderIdAttribute).Value;
            }
            else
            {
                if (info.Placeholders.Any())
                {
                    info.DefaultPlaceholderId = info.Placeholders.First().Key;
                }
            }

            return info;
        }



        public static XDocument GetTemplateDocument(Guid templateId)
        {
            IPageTemplate template = GetTemplate(templateId);

            string templateMarkup = PageTemplateFileWrapper.Get(template).Content;

            XDocument document;
            try
            {
                document = XDocument.Parse(templateMarkup);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to parse template markup for file '{0}'", template.PageTemplateFilePath), ex);
            }

            return document;
        }

        private static IPageTemplate GetTemplate(Guid templateId)
        {
            IPageTemplate cachedValue = PageTemplateCache.Get(templateId);

            if(cachedValue != null)
            {
                return cachedValue;
            }

            var templates =
                from template in DataFacade.GetData<Composite.Data.Types.IPageTemplate>()
                where template.Id == templateId
                select template;

            IPageTemplate result = templates.FirstOrDefault();
            Verify.That(result != null, "Failed to get a page template by id. Id = '{0}'", templateId);

            PageTemplateCache.Add(templateId, result);

            return result;
        }

        private static string GetPlaceHolderTitle(XElement placeHolder)
        {
            XAttribute titleAttribute = placeHolder.Attribute(RenderingElementNames.PlaceHolderTitleAttribute);

            if (titleAttribute != null)
            {
                return titleAttribute.Value;
            }
            else
            {
                return placeHolder.Attribute(RenderingElementNames.PlaceHolderIdAttribute).Value;
            }
        }

        /// <summary>
        /// In order to avoid memory leaks we have a separate object that represents loaded file content.
        /// </summary>
        private class PageTemplateFileWrapper
        {
            private string _content;
            private string _pageTemplateFilePath;

            private static Cache<string, PageTemplateFileWrapper> _cache = new Cache<string, PageTemplateFileWrapper>("Page template files", 100);

            internal PageTemplateFileWrapper(IPageTemplate pageTemplate)
            {
                _pageTemplateFilePath = pageTemplate.PageTemplateFilePath;
                IFile file = IFileServices.GetFile<IPageTemplateFile>(_pageTemplateFilePath);
                _content = file.ReadAllText();

                file.SubscribeOnChanged(OnFileChanged);
            }

            public string Content
            {
                get { return _content; }
            }

            private void OnFileChanged(string filePath, FileChangeType changeType)
            {
                _cache.Remove(_pageTemplateFilePath);
            }

            public static PageTemplateFileWrapper Get(IPageTemplate pageTemplate)
            {
                PageTemplateFileWrapper result = _cache.Get(pageTemplate.PageTemplateFilePath);
                if(result != null)
                {
                    return result;
                }

                result = new PageTemplateFileWrapper(pageTemplate);
                _cache.Add(result._pageTemplateFilePath, result);
                return result;
            }
        }
	}
}
