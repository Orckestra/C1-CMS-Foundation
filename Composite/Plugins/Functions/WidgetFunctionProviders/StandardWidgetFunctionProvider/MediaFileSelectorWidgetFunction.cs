using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Functions;
using Composite.Core.Logging;
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Types;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider
{
    internal sealed class MediaFileSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private static readonly string LogTitle = "MediaFileSelectorWidgetFunction";
        private const string _functionName = "MediaFileSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + "." + _functionName;
        public const string RequiredParameterName = "Required";

        private static readonly Expression IgnoreCaseConstantExpression = Expression.Constant(StringComparison.OrdinalIgnoreCase, typeof(StringComparison));
        private static readonly MethodInfo EndsWithMethodInfo = typeof(string).GetMethod("EndsWith", new[] { typeof(string), typeof(StringComparison) });
        private static Hashtable<string, Expression<Func<IMediaFile, bool>>> _expressionCache = new Hashtable<string, Expression<Func<IMediaFile, bool>>>();




        public MediaFileSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(NullableDataReference<IMediaFile>), entityTokenFactory)
        {
            var widget = new WidgetFunctionProvider(MediaFileFolderSelectorWidget.CompositeName);

            base.AddParameterProfile(
                new ParameterProfile("MediaFileFolderReference", typeof(DataReference<IMediaFileFolder>), false,
                    new ConstantValueProvider(new DataReference<IMediaFileFolder>()), widget, new Dictionary<string, object>(),
                    "Media Folder", new HelpDefinition("Select a media folder to choose files from. Default is all media files.")));

            base.AddParameterProfile(
                new ParameterProfile("FileExtensionFilter", typeof(string), false,
                    new ConstantValueProvider(""), StandardWidgetFunctions.TextBoxWidget, null,
                    "File Extension Filter", new HelpDefinition("Limit the list to files which have the specified extension. Default is no filter.")));

            base.AddParameterProfile(
                new ParameterProfile("IncludeSubfolders", typeof(bool), false,
                    new ConstantValueProvider(true), StandardWidgetFunctions.GetBoolSelectorWidget("Include files from subfolders", "Only show files from the specified Media folder"), null,
                    "Include Subfolders", new HelpDefinition("When false files from subfolders will no be included.")));

            var requiredWidget = StandardWidgetFunctions.GetBoolSelectorWidget("Yes, require selection", "No, optional");

            base.AddParameterProfile(
                new ParameterProfile(RequiredParameterName, typeof(bool), false,
                    new ConstantValueProvider(true), requiredWidget, new Dictionary<string, object>(),
                    "Selection required", new HelpDefinition("Specify if selecting a media file should be required."))
                );

        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            // TODO: config widget for optional values
            bool selectionRequired = parameters.GetParameter<bool>(RequiredParameterName);

            var searchToken = new MediaFileSearchToken();
            string extensionStr = parameters.GetParameter<string>("FileExtensionFilter");
            if(!extensionStr.IsNullOrEmpty())
            {
                searchToken.Extensions = extensionStr.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            }

            searchToken.Folder = GetFolderPath(parameters.GetParameter<DataReference<IMediaFileFolder>>("MediaFileFolderReference"));
            searchToken.HideSubfolders = !parameters.GetParameter<bool>("IncludeSubfolders");

            XElement selector = base.BuildBasicWidgetMarkup("DataReferenceTreeSelector", "Selected", label, help, bindingSourceName);

            selector.Add(
                new XAttribute("Handle", "Composite.Management.EmbeddableMediaSelectorDialog"),
                new XAttribute("SearchToken", searchToken.Serialize()),
                new XAttribute("DataType", TypeManager.SerializeType(typeof(IMediaFile))),
                new XAttribute("NullValueAllowed", (!selectionRequired))
            );

            return selector;
        }

        private static string GetFolderPath(DataReference<IMediaFileFolder> folderReference)
        {
            if (folderReference != null && folderReference.IsSet)
            {
                IMediaFileFolder folder;

                try
                {
                    folder = folderReference.Data;

                    if (folder != null)
                    {
                        return folder.Path;
                    }
                }
                catch (Exception)
                {
                    string reference = folderReference.Serialize() ?? string.Empty;
                    LoggingService.LogError(LogTitle, "Failed to get media folder by referece: '{0}'".FormatWith(reference));
                }
            }
            return null;
        }

        public static Type GetMediaType()
        {
            return typeof(IMediaFile);
        }

        /// <summary>
        /// Provides data for the drop down list. Left here only for backwards compatibility
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        [Obsolete("Was used only in old media file widget's markup.")]
        public static IEnumerable<DataReferenceLabelPair<IMediaFile>> GenerateSelectorOptions(string key)
        {
            string folderString = key.Split('?')[0];
            string extensionFilter = key.Split('?')[1];
            bool includeSubfolders = bool.Parse(key.Split('?')[2]);

            IQueryable<IMediaFile> queryable = DataFacade.GetData<IMediaFile>();

            bool filterByFolder = !folderString.IsNullOrEmpty();

            IMediaFileFolder folder = null;

            if (filterByFolder)
            {
                var folderReference = new DataReference<IMediaFileFolder>(folderString);
                folder = folderReference.Data;

                string storeId = folder.StoreId;

                queryable = queryable.Where(mediaFile => mediaFile.StoreId == storeId);

                string folderPath = folder.Path;
                if (!includeSubfolders)
                {
                    queryable = queryable.Where(mediaFile => mediaFile.FolderPath == folderPath);
                }
                else
                {
                    string descFolderPrefix = folderPath + "/";
                    queryable = queryable.Where(mediaFile => mediaFile.FolderPath == folderPath || mediaFile.FolderPath.StartsWith(descFolderPrefix));

                }
            }


            if (!extensionFilter.IsNullOrEmpty())
            {
                Expression<Func<IMediaFile, bool>> filter = GetExtensionFilter(extensionFilter);

                if (filter != null)
                {
                    queryable = queryable.Where(filter);
                }
            }

            // orderby mediaFile.StoreId, mediaFile.FolderPath, mediaFile.FileName
            queryable = queryable.OrderBy(file => file.StoreId).ThenBy(file => file.FolderPath).ThenBy(file => file.FileName);


            if (filterByFolder)
            {
                int pathLength = folder.Path.Length;

                return from mediaFile in queryable
                       select new DataReferenceLabelPair<IMediaFile>(mediaFile, mediaFile.FolderPath.Substring(pathLength) + "/" + mediaFile.FileName);
            }

            return from mediaFile in queryable
                   select new DataReferenceLabelPair<IMediaFile>(mediaFile, mediaFile.StoreId + ":" + mediaFile.FolderPath + "/" + mediaFile.FileName);
        }

        [Obsolete()]
        private static Expression<Func<IMediaFile, bool>> GetExtensionFilter(string allowedFileExtensions)
        {
            allowedFileExtensions = allowedFileExtensions.ToLowerInvariant();

            Expression<Func<IMediaFile, bool>> cachedValue = _expressionCache[allowedFileExtensions];
            if (cachedValue != null) return cachedValue;

            lock (_expressionCache)
            {
                cachedValue = _expressionCache[allowedFileExtensions];
                if (cachedValue != null) return cachedValue;


                string[] extensions = allowedFileExtensions.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                if (extensions.Length == 0)
                {
                    return null;
                }

                // "file"
                var fileParameter = Expression.Parameter(typeof(IMediaFile), "file");

                Expression body = null;

                foreach (string extension in extensions)
                {
                    string suffix = extension.StartsWith(".") ? extension : "." + extension;

                    // "file.FileName"
                    Expression fileName = Expression.Property(fileParameter, typeof(IFile), "FileName");

                    // Building "file.FileName.EndsWith(suffix, StringComparison.OrdinalIgnoreCase)"
                    MethodCallExpression predicate = Expression.Call(fileName,
                                                                     EndsWithMethodInfo,
                                                                     Expression.Constant(suffix),
                                                                     IgnoreCaseConstantExpression);

                    if (body == null)
                    {
                        // file => file.FileName.EndsWith(extension, StringComparison.OrdinalIgnoreCase);
                        body = predicate;
                    }
                    else
                    {
                        // body = (.....) || file.FileName.EndsWith(extension, StringComparison.OrdinalIgnoreCase;
                        body = Expression.OrElse(body, predicate);
                    }
                }

                var result = Expression.Lambda<Func<IMediaFile, bool>>(body, fileParameter);

                _expressionCache.Add(allowedFileExtensions, result);

                return result;
            }
        }
    }
}