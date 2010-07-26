using System;
using System.Linq;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.IO;
using Composite.Logging;
using Composite.StandardPlugins.Elements.ElementProviders.MediaFileProviderElementProvider;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Data;
using Composite.StringExtensions;
using Composite.Data.Types;
using Composite.Types;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider
{
	internal sealed class ImageSelectorWidgetFunction : CompositeWidgetFunctionBase
    {
        private static readonly string LogTitle = "ImageSelectorWidgetFunction";
        private const string _functionName = "ImageSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + "." + _functionName;
        public const string RequiredParameterName = "Required";
        public const string MediaFileFolderReferenceParameterName = "MediaFileFolderReference";

        public ImageSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(NullableDataReference<IImageFile>), entityTokenFactory)
        {
            var mediaFolderSelectorWidget = new WidgetFunctionProvider(MediaFileFolderSelectorWidget.CompositeName);

            base.AddParameterProfile(
                new ParameterProfile(MediaFileFolderReferenceParameterName,
                    typeof(DataReference<IMediaFileFolder>),
                    false,
                    new ConstantValueProvider(new DataReference<IMediaFileFolder>()),
                    mediaFolderSelectorWidget,
                    new Dictionary<string, object>(),
                    "Image folder",
                    new HelpDefinition("Select a media folder to choose images from. Default is 'all media'."))
                );

            var requiredWidget = StandardWidgetFunctions.GetBoolSelectorWidget("Yes, require selection", "No, optional");

            base.AddParameterProfile(
                new ParameterProfile(RequiredParameterName, 
                    typeof(bool), 
                    false, 
                    new ConstantValueProvider(true),
                    requiredWidget, 
                    new Dictionary<string, object>(), 
                    "Selection required", 
                    new HelpDefinition("Specify if selecting an image should be required."))
                );
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            var searchToken = new MediaFileSearchToken();
            searchToken.MimeTypes = new string[] { MimeTypeInfo.Gif, MimeTypeInfo.Jpeg, MimeTypeInfo.Png, MimeTypeInfo.Bmp };

            var folderReference = parameters.GetParameter<DataReference<IMediaFileFolder>>(MediaFileFolderReferenceParameterName);
            bool selectionRequired = parameters.GetParameter<bool>(RequiredParameterName);

            if (folderReference != null && folderReference.IsSet)
            {
                IMediaFileFolder folder;

                try
                {
                    folder = folderReference.Data;

                    if(folder != null)
                    {
                        searchToken.Folder = folder.Path;
                    }
                }
                catch (Exception)
                {
                    string reference = folderReference.Serialize() ?? string.Empty;
                    LoggingService.LogError(LogTitle, "Failed to get media folder by referece: '{0}'".FormatWith(reference));
                }
            }

            XElement selector = base.BuildBasicWidgetMarkup("DataReferenceTreeSelector", "Selected", label, help, bindingSourceName);

            selector.Add(
                new XAttribute("Handle", "Composite.Management.ImageSelectorDialog"),
                new XAttribute("SearchToken", searchToken.Serialize()),
                new XAttribute("DataType", TypeManager.SerializeType(typeof(IImageFile))),
                new XAttribute("NullValueAllowed", (!selectionRequired))
            );

            return selector;
        }

        public static Type GetImageType()
        {
            return typeof (IImageFile);
        }


        /// <summary>
        /// Provides data for the drop down list. Left here only for backwards compatibility
        /// </summary>
        /// <param name="folderReference"></param>
        /// <returns></returns>
        [Obsolete("Was used only in old image widget's markup.")]
        public static IEnumerable<DataReferenceLabelPair<IImageFile>> GenerateSelectorOptions(DataReference<IMediaFileFolder> folderReference)
        {
            IMediaFileFolder folder = null;

            if (folderReference.IsSet)
            {
                try
                {
                    folder = folderReference.Data;
                }
                catch (Exception)
                {
                    string reference = folderReference.Serialize() ?? string.Empty;
                    LoggingService.LogError(LogTitle, "Failed to get media folder by referece: '{0}'".FormatWith(reference));
                }
            }

            if (folder != null)
            {
                int pathLength = folder.Path.Length;

                return
                    from mediaFile in DataFacade.GetData<IImageFile>()
                    where mediaFile.StoreId == folder.StoreId && mediaFile.FolderPath.StartsWith(folder.Path)
                    orderby mediaFile.StoreId, mediaFile.FolderPath, mediaFile.FileName
                    select new DataReferenceLabelPair<IImageFile>(mediaFile, mediaFile.FolderPath.Substring(pathLength) + "/" + mediaFile.FileName);
            }

            // Returning all of the images
            return
                from mediaFile in DataFacade.GetData<IImageFile>()
                orderby mediaFile.StoreId, mediaFile.FolderPath, mediaFile.FileName
                select new DataReferenceLabelPair<IImageFile>(mediaFile, mediaFile.StoreId + ":" + mediaFile.FolderPath + "/" + mediaFile.FileName);
        }
    }
}