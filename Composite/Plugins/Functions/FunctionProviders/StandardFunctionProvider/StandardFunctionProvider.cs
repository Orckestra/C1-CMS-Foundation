using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using Composite.Data.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider
{
    [ConfigurationElementType(typeof(StandardFunctionProviderData))]
    internal class StandardFunctionProvider : IDynamicTypeFunctionProvider
	{
        private EntityTokenFactory _entityTokenFactory;
        private List<IFunction> _standardStaticTypeFunctions = null;
        private List<IFunction> _standardDynamicTypeFunctions = null;



        public StandardFunctionProvider(string providerName)
        {
            _entityTokenFactory = new EntityTokenFactory(providerName);
        }



        public FunctionNotifier FunctionNotifier
        {
            set {} // List is static
        }



        public IEnumerable<IFunction> Functions
        {
            get 
            {
                if (_standardStaticTypeFunctions == null)
                {
                    InitializeStaticTypeFunctions();
                }

                foreach (IFunction function in _standardStaticTypeFunctions)
                {
                    yield return function;
                }
            }
        }



        public IEnumerable<IFunction> DynamicTypeDependentFunctions
        {
            get 
            {
                if (_standardDynamicTypeFunctions == null)
                {
                    InitializeDynamicTypeFunctions();
                }

                foreach (IFunction function in _standardDynamicTypeFunctions)
                {
                    yield return function;
                }
            }
        }



        private void InitializeStaticTypeFunctions()
        {
            _standardStaticTypeFunctions = new List<IFunction>();

            // constant
            _standardStaticTypeFunctions.Add(new Constant.StringFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Constant.DateTimeFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Constant.BooleanFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Constant.DecimalFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Constant.IntegerFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Constant.GuidFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Constant.XhtmlDocumentFunction(_entityTokenFactory));

            // web
            _standardStaticTypeFunctions.Add(new Web.Client.BrowserPlatformFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Client.BrowserStringFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Client.BrowserTypeFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Client.BrowserVersionFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Client.EcmaScriptVersionFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Client.IsCrawlerFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Client.IsMobileDeviceFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Html.Template.CommonMetaTagsFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Html.Template.LangAttributeFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Html.Template.PageTemplateFeatureFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.CookieValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.SessionVariableFunction(_entityTokenFactory));

            _standardStaticTypeFunctions.Add(new Web.Request.FormPostValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.FormPostBoolValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.FormPostDecimalValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.FormPostGuidValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.FormPostIntegerValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.FormPostXmlFormattedDateTimeValueFunction(_entityTokenFactory));

            _standardStaticTypeFunctions.Add(new Web.Request.QueryStringValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.QueryStringBoolValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.QueryStringDecimalValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.QueryStringGuidValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.QueryStringIntegerValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.QueryStringXmlFormattedDateTimeValueFunction(_entityTokenFactory));

            _standardStaticTypeFunctions.Add(new Web.Request.PathInfoFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.PathInfoIntFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.PathInfoGuidFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Request.RegisterPathInfoUsageFunction(_entityTokenFactory));

            _standardStaticTypeFunctions.Add(new Web.Response.RedirectFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Response.SetCookieValueFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Response.SetServerPageCacheDuration(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Response.SetSessionVariableFunction(_entityTokenFactory));

            _standardStaticTypeFunctions.Add(new Web.Server.ApplicationPath(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Server.ApplicationVariableFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Web.Server.ServerVariableFunction(_entityTokenFactory));

            // date
            _standardStaticTypeFunctions.Add(new Utils.Date.NowFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Date.AddDaysFunction(_entityTokenFactory));

            // guid
            _standardStaticTypeFunctions.Add(new Utils.GuidFunctions.NewGuid(_entityTokenFactory));

            // globalization
            _standardStaticTypeFunctions.Add(new Utils.Globalization.CurrentCulture(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Globalization.AllCultures(_entityTokenFactory));

            // validation
            _standardStaticTypeFunctions.Add(new Utils.Validation.RegexValidationFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.StringLengthValidationFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.NotNullValidationFunction<string>(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.NotNullValidationFunction<int>(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.NotNullValidationFunction<decimal>(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.NotNullValidationFunction<DateTime>(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.NotNullValidationFunction<Guid>(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.IntegerRangeValidationFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Validation.DecimalPrecisionValidationFunction(_entityTokenFactory));

            // xml
            _standardStaticTypeFunctions.Add(new Xml.LoadFileFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Xml.LoadXhtmlFileFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Xml.LoadUrlFunction(_entityTokenFactory));

            // caching
            _standardStaticTypeFunctions.Add(new Utils.Caching.PageObjectCacheFunction(_entityTokenFactory));

            // compare
            _standardStaticTypeFunctions.Add(new Utils.Compare.AreEqualFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Compare.IsLessThanFunction(_entityTokenFactory));

            // configuration
            _standardStaticTypeFunctions.Add(new Utils.Configuration.AppSettingsValueFunction(_entityTokenFactory));

            // parameters
            _standardStaticTypeFunctions.Add(new Utils.GetInputParameterFunction(_entityTokenFactory));

            // parse string to object
            _standardStaticTypeFunctions.Add(new Utils.ParseStringToObjectFunction(_entityTokenFactory));

            // string
            _standardStaticTypeFunctions.Add(new Utils.String.Join(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.String.JoinTwo(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.String.Split(_entityTokenFactory));

            // int
            _standardStaticTypeFunctions.Add(new Utils.Integer.Sum(_entityTokenFactory));

            // XsltExtensions
            _standardStaticTypeFunctions.Add(new Xslt.Extensions.DateFormattingXsltExtensionsFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Xslt.Extensions.GlobalizationXsltExtensionsFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Xslt.Extensions.MarkupParserXsltExtensionsFunction(_entityTokenFactory));

            // AspNet
            _standardStaticTypeFunctions.Add(new AspNet.LoadUserControlFunction(_entityTokenFactory));

            // Mail
            _standardStaticTypeFunctions.Add(new Mail.SendMailFunction(_entityTokenFactory));

            // Media
            _standardStaticTypeFunctions.Add(new Media.MediaFolderFilterFunction<IMediaFile>(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Media.MediaFolderFilterFunction<IImageFile>(_entityTokenFactory));

            // Utils.Predicates
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringContainsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringStartsWithPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringEndsWithPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringNoValuePredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringInListPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.StringInCommaSeparatedListPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.DateTimeLessThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.DateTimeGreaterThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.DateTimeEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.IntegerLessThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.IntegerGreaterThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.IntegerEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.DecimalLessThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.DecimalGreaterThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.DecimalEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.BoolEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.GuidEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.GuidInCommaSeparatedListPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableBoolEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableBoolNoValuePredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableDateTimeEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableDateTimeGreaterThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableDateTimeLessThanPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableDateTimeNoValuePredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableDecimalEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableDecimalNoValuePredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableGuidEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableGuidNoValuePredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableIntegerEqualsPredicateFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Predicates.NullableIntegerNoValuePredicateFunction(_entityTokenFactory));
            
            // Utils.Dictionary
            _standardStaticTypeFunctions.Add(new Utils.Dictionary.XElementsToDictionaryFunction(_entityTokenFactory));
            _standardStaticTypeFunctions.Add(new Utils.Dictionary.EnumerableToDictionary(_entityTokenFactory));
        }



        private void InitializeDynamicTypeFunctions()
        {
            _standardDynamicTypeFunctions = new List<IFunction>();

            // pages
            _standardDynamicTypeFunctions.Add(new Pages.SitemapXmlFunction(_entityTokenFactory));
            _standardDynamicTypeFunctions.Add(new Pages.SitemapFunction(_entityTokenFactory));
            _standardDynamicTypeFunctions.Add(new Pages.GetPageIdFunction(_entityTokenFactory));
            _standardDynamicTypeFunctions.Add(new Pages.GetForeignPageInfoFunction(_entityTokenFactory));

            // data.filter
            List<Type> dataInterfaces = DataFacade.GetAllKnownInterfaces(UserType.Developer);
            object[] args = new object[] { _entityTokenFactory };

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                where DataAssociationRegistry.IsAssociationType(t) == true
                select (IFunction)Activator.CreateInstance(typeof(ActivePageReferenceFilter<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(FieldPredicatesFilter<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(CompoundFilter<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(DataReferenceFilter<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(GetXml<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(GetDataReference<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(GetNullableDataReference<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(AddDataInstance<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(UpdateDataInstance<>).MakeGenericType(t), args));

            _standardDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IFunction)Activator.CreateInstance(typeof(DeleteDataInstance<>).MakeGenericType(t), args));
        }
    }


    [Assembler(typeof(StandardFunctionProviderAssembler))]
    internal sealed class StandardFunctionProviderData : FunctionProviderData
    {
    }




    internal sealed class StandardFunctionProviderAssembler : IAssembler<IFunctionProvider, FunctionProviderData>
    {
        public IFunctionProvider Assemble(IBuilderContext context, FunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new StandardFunctionProvider(objectConfiguration.Name);
        }
    }
}
