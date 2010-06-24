using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Data;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Media
{
    public sealed class MediaFolderFilterFunction<TMedia> : StandardFunctionBase where TMedia : IMediaFile
    {
        private static readonly MethodInfo MethodInfoGetFolderPath = typeof(IFile).GetProperty("FolderPath").GetGetMethod();
        private static readonly MethodInfo MethodInfoStringStartsWith = typeof(string).GetMethod("StartsWith", new[] { typeof(string) });


        public MediaFolderFilterFunction(EntityTokenFactory entityTokenFactory)
            : base("MediaFolderFilter", typeof(TMedia).FullName, typeof(Expression<Func<TMedia, bool>>), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    "MediaFolder",
                    typeof(DataReference<IMediaFileFolder>),
                    false,
                    new ConstantValueProvider(null),
                    StandardWidgetFunctions.GetDataReferenceWidget<IMediaFileFolder>());

                WidgetFunctionProvider widget = StandardWidgetFunctions.GetBoolSelectorWidget("True", "False");

                yield return new StandardFunctionParameterProfile(
                    "IncludeSubfolders",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(false), widget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var mediaFolderReference = parameters.GetParameter<DataReference<IMediaFileFolder>>("MediaFolder");
            Verify.ArgumentNotNull(mediaFolderReference, "mediaFolderReference");

            bool includeSubfolders = parameters.GetParameter<bool>("IncludeSubfolders");

            IMediaFileFolder mediaFolder = GetMediaFolder(mediaFolderReference);

            if (mediaFolder == null)
            {
                return (Expression<Func<TMedia, bool>>)(f => false);
            }

            string mediaFolderPath = mediaFolder.Path;
            string mediaFolderPathWithSlash = mediaFolder.Path + "/";

            if (includeSubfolders)
            {
                //return (Expression<Func<TMedia, bool>>)
                //       (image => image.FolderPath == mediaFolderPath
                //            || image.FolderPath.StartsWith(mediaFolderPathWithSlash));

                var imageParam = Expression.Parameter(typeof(TMedia), "image");

                var orElse = Expression.OrElse(
                    Expression.Equal(Expression.Property(imageParam, MethodInfoGetFolderPath),
                                     Expression.Constant(mediaFolderPath)),
                    Expression.Call(Expression.Property(imageParam, MethodInfoGetFolderPath),
                                    MethodInfoStringStartsWith,
                                    new Expression[] { Expression.Constant(mediaFolderPathWithSlash) }));

                return Expression.Lambda<Func<TMedia, bool>>(orElse, imageParam);
            }
            // return (Expression<Func<TMedia, bool>>)(imageParam1 => imageParam1.FolderPath == mediaFolderPath);

            var imageParam1 = Expression.Parameter(typeof(TMedia), "image");

            return Expression.Lambda<Func<TMedia, bool>>(
                 Expression.Equal(Expression.Property(imageParam1, MethodInfoGetFolderPath),
                                  Expression.Constant(mediaFolderPath)),
                imageParam1);
        }

        private static IMediaFileFolder GetMediaFolder(DataReference<IMediaFileFolder> mediaFolderReference)
        {
            string mediaFolderKeyPath = mediaFolderReference.KeyValue as string;

            using (new DataScope(DataScopeIdentifier.Public))
            {
                var query = DataFacade.GetData<IMediaFileFolder>();

                if (query.IsEnumerableQuery())
                {
                    return query.AsEnumerable().Where(mf => mf.KeyPath == mediaFolderKeyPath).FirstOrDefault();
                }

                return query.Where(mf => mf.KeyPath == mediaFolderKeyPath).FirstOrDefault();
            }
        }
    }
}