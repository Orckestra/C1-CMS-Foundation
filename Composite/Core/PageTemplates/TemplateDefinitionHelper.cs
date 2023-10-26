using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Functions;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Helper class for working with page template definitions based on <see cref="IPageTemplate"/>
    /// </summary>
    public static class TemplateDefinitionHelper
    {
        /// <summary>
        /// Builds a page template descriptor. Extracts template's properties and content placeholder properties.
        /// </summary>
        /// <param name="templateDefinition">The template definition.</param>
        /// <param name="descriptorConstructor">The descriptor constructor.</param>
        /// <param name="placeholderProperties">The placeholder properties.</param>
        /// <returns></returns>
        public static DescriptorType BuildPageTemplateDescriptor<DescriptorType>(IPageTemplate templateDefinition,
                                           Func<DescriptorType> descriptorConstructor,
                                           out IDictionary<string, PropertyInfo> placeholderProperties)
            where DescriptorType : PageTemplateDescriptor
        {
            Verify.ArgumentNotNull(templateDefinition, "templateDefinition");
            Verify.ArgumentNotNull(descriptorConstructor, "descriptorConstructor");

            DescriptorType pageTemplate = descriptorConstructor();
            Verify.ArgumentCondition(pageTemplate != null, "descriptorConstructor", "Not null object expected");

            if (templateDefinition.TemplateId == null || templateDefinition.TemplateId == Guid.Empty)
            {
                throw new InvalidOperationException("TemplateId has not been correctly defined");
            }

            pageTemplate.Id = templateDefinition.TemplateId;
            pageTemplate.Title = templateDefinition.TemplateTitle;

            string defaultPlaceholderId = null;

            var placeholders = new List<PlaceholderDescriptor>();
            placeholderProperties = new Dictionary<string, PropertyInfo>();

            var type = templateDefinition.GetType();

            while (type.GetInterfaces().Contains(typeof(IPageTemplate)))
            {
                foreach (var property in type.GetProperties())
                {
                    if(property.ReflectedType != property.DeclaringType) continue;

                    var placeholderAttributes = property.GetCustomAttributes(typeof(PlaceholderAttribute), true);
                    if (placeholderAttributes.Length == 0) continue;

                    Verify.That(placeholderAttributes.Length == 1, $"Multiple '{typeof(PlaceholderAttribute)}' attributes defined on property '{property.Name}'");

                    var placeholderAttribute = (PlaceholderAttribute)placeholderAttributes[0];

                    string placeholderId = placeholderAttribute.Id ?? property.Name;
                    string placeholderLabel = placeholderAttribute.Title ?? property.Name;

                    if (placeholderProperties.ContainsKey(placeholderId))
                    {
                        throw new InvalidOperationException("Placeholder '{0}' defined multiple times".FormatWith(placeholderId));
                    }

                    var containerClasses = ContainerClassManager.ParseToList(placeholderAttribute.ContainerClasses).ToList();

                    placeholderProperties.Add(placeholderId, property);
                    placeholders.Add(new PlaceholderDescriptor { Id = placeholderId, Title = placeholderLabel, ContainerClasses = containerClasses });
                    

                    if (placeholderAttribute.IsDefault)
                    {
                        Verify.IsNull(defaultPlaceholderId, "More than one placeholder is marked as default");

                        defaultPlaceholderId = placeholderId;
                    }
                }

                type = type.BaseType;
            }

            if (defaultPlaceholderId == null && placeholders.Any())
            {
                defaultPlaceholderId = placeholders.First().Id;
            }

            pageTemplate.DefaultPlaceholderId = defaultPlaceholderId;
            pageTemplate.PlaceholderDescriptions = placeholders;

            return pageTemplate;
        }

        /// <summary>
        /// Binds placeholders' content to the related properties on a template definition
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="pageContentToRender">The page rendering job.</param>
        /// <param name="placeholderProperties">The placeholder properties.</param>
        /// <param name="functionContextContainer">The function context container, if not null, nested functions fill be evaluated.</param>
        public static void BindPlaceholders(IPageTemplate template,
            PageContentToRender pageContentToRender,
            IDictionary<string, PropertyInfo> placeholderProperties,
            FunctionContextContainer functionContextContainer)
        {
            BindPlaceholdersInternalAsync(template, pageContentToRender, placeholderProperties, functionContextContainer, false)
                .ConfigureAwait(false).GetAwaiter().GetResult();
        }

        /// <summary>
        /// Binds placeholders' content to the related properties on a template definition
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="pageContentToRender">The page rendering job.</param>
        /// <param name="placeholderProperties">The placeholder properties.</param>
        /// <param name="functionContextContainer">The function context container, if not null, nested functions fill be evaluated.</param>
        public static Task BindPlaceholdersAsync(IPageTemplate template,
            PageContentToRender pageContentToRender,
            IDictionary<string, PropertyInfo> placeholderProperties,
            FunctionContextContainer functionContextContainer)
        {
            return BindPlaceholdersInternalAsync(template, pageContentToRender, placeholderProperties, functionContextContainer, false);
        }

        private static async Task BindPlaceholdersInternalAsync(IPageTemplate template, 
             PageContentToRender pageContentToRender,
             IDictionary<string, PropertyInfo> placeholderProperties,
             FunctionContextContainer functionContextContainer,
             bool sync)
        {
            Verify.ArgumentNotNull(template, "template");
            Verify.ArgumentNotNull(pageContentToRender, "pageContentToRender");
            Verify.ArgumentNotNull(placeholderProperties, "placeholderProperties");

            foreach (var placeholderContent in pageContentToRender.Contents)
            {
                string placeholderId = placeholderContent.PlaceHolderId;

                if (!placeholderProperties.ContainsKey(placeholderId)) continue;

                XhtmlDocument placeholderXhtml = PageRenderer.ParsePlaceholderContent(placeholderContent);

                if (functionContextContainer != null)
                {
                    bool allFunctionsExecuted;

                    using (Profiler.Measure($"Evaluating placeholder '{placeholderId}'"))
                    {
                        allFunctionsExecuted = sync
                            ? PageRenderer.ExecuteCacheableFunctions(placeholderXhtml.Root, functionContextContainer)
                            : await PageRenderer.ExecuteCacheableFunctionsAsync(placeholderXhtml.Root, functionContextContainer);
                    }

                    if (allFunctionsExecuted)
                    {
                        using (Profiler.Measure("Normalizing XHTML document"))
                        {
                            PageRenderer.NormalizeXhtmlDocument(placeholderXhtml);
                        }
                    }
                }

                PageRenderer.ResolveRelativePaths(placeholderXhtml);

                PropertyInfo property = placeholderProperties[placeholderId];

                if (!property.ReflectedType.IsInstanceOfType(template))
                {
                    string propertyName = property.Name;
                    property = template.GetType().GetProperty(property.Name);
                    Verify.IsNotNull(property, "Failed to find placeholder property '{0}'", propertyName);
                }

                property.SetValue(template, placeholderXhtml);
            }
        }
    }
}
