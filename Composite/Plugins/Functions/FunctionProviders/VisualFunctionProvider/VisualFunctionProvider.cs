using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.Plugins.FunctionProvider;
using Composite.Core.Logging;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Functions.FunctionProviders.VisualFunctionProvider
{
    [ConfigurationElementType(typeof(VisualFunctionProviderData))]
    internal sealed class VisualFunctionProvider : IDynamicTypeFunctionProvider
    {
        private FunctionNotifier _functionNotifier;

        public VisualFunctionProvider()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd<IVisualFunction>(OnDataChanged, false);
            DataEventSystemFacade.SubscribeToDataDeleted<IVisualFunction>(OnDataChanged, false);
            DataEventSystemFacade.SubscribeToDataAfterUpdate<IVisualFunction>(OnDataChanged, false);
        }



        public FunctionNotifier FunctionNotifier
        {
            set { _functionNotifier = value; }
        }


        public IEnumerable<IFunction> Functions
        {
            get
            {
                yield break;
            }
        }




        public IEnumerable<IFunction> DynamicTypeDependentFunctions
        {
            get
            {
                List<IVisualFunction> functions = DataFacade.GetData<IVisualFunction>().ToList();

                var functionInfos =
                    (from function in functions
                     select new {
                         DataType = TypeManager.TryGetType( function.TypeManagerName ),
                         Function = function
                     }).ToList();    

                    foreach( var missingTypeFunctionInfo in functionInfos.Where( f=>f.DataType==null))
                    {
                        LoggingService.LogError(this.GetType().Name, string.Format("The function '{0}' in namespace '{1}' is dependant on an unknown type '{2}'. Function not loaded.", missingTypeFunctionInfo.Function.Namespace, missingTypeFunctionInfo.Function.Name, missingTypeFunctionInfo.Function.TypeManagerName));
                    }

                return
                    from fi in functionInfos
                    where fi.DataType != null
                    select (IFunction)Activator.CreateInstance(typeof(VisualFunction<>).MakeGenericType(fi.DataType), new object[] { fi.Function });
            }
        }



        private void OnDataChanged(object sender, DataEventArgs dataEventArgs)
        {
            _functionNotifier.FunctionsUpdated();
        }





        private sealed class VisualFunction<T> : IFunction
            where T : class, IData
        {
            private IVisualFunction _visualFunction;
            private XhtmlDocument _templateDocument = null;
            private DataTypeDescriptor _typeDescriptor = null;
            private object _lock = new object();



            public VisualFunction(IVisualFunction visualFunction)
            {
                _visualFunction = visualFunction;
            }




            public object Execute(ParameterList parameters, FunctionContextContainer context)
            {
                Initialize();
                int maximumItemsToList = parameters.GetParameter<int>("MaximumItemsToList");
                string orderbyFieldName = parameters.GetParameter<string>("OrderbyFieldName");
                bool orderbyAscending = parameters.GetParameter<bool>("OrderbyAscending");

                Expression<Func<T, bool>> filter;
                if (parameters.TryGetParameter<Expression<Func<T, bool>>>("Filter", out filter) == false)
                {
                    filter = f => true;
                }


                var runtimeFunction = new RuntimeVisualFunction(_visualFunction, maximumItemsToList, orderbyFieldName, orderbyAscending);

                return RenderingHelper.RenderDataList<T>(runtimeFunction, _templateDocument, _typeDescriptor, context, filter);
            }




            private void Initialize()
            {
                if (_templateDocument == null)
                {
                    lock (_lock)
                    {
                        if (_templateDocument == null)
                        {
                            Type interfaceType = TypeManager.GetType(_visualFunction.TypeManagerName);
                            _typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

                            if (_typeDescriptor == null) throw new InvalidOperationException(string.Format("DataTypeDescriptor not found for type '{0}'", interfaceType));

                            _templateDocument = XhtmlDocument.Parse(_visualFunction.XhtmlTemplate);
                        }
                    }
                }
            }



            public string Name
            {
                get
                {
                    return _visualFunction.Name;
                }
            }



            public string Namespace
            {
                get
                {
                    return _visualFunction.Namespace;
                }
            }


            public string Description 
            { 
                get 
                {
                    return _visualFunction.Description; 
                } 
            }


            public Type ReturnType
            {
                get
                {
                    return typeof(XhtmlDocument);
                }
            }



            public IEnumerable<ParameterProfile> ParameterProfiles
            {
                get
                {
                    Initialize();

                    //if (_typeDescriptor.DataAssociations.Where(f => f.AssociatedInterfaceType == typeof(IPage) && f.AssociationType == DataAssociationType.Aggregation).Any())
                    //{
                        Expression<Func<T, bool>> defaultFilter = f => true;

                        yield return new ParameterProfile(
                            "Filter",
                            typeof(Expression<Func<T, bool>>),
                            false,
                            new ConstantValueProvider(defaultFilter),
                            null,
                            "List Filter",
                            new HelpDefinition("The selection filter applied to the data to be shown. The default is no filtering."));
                    //}

                    WidgetFunctionProvider fieldsDropDown = StandardWidgetFunctions.DropDownList(
                        this.GetType(), "OrderByFieldNames", _visualFunction.TypeManagerName, false, true, true);

                    yield return new ParameterProfile("MaximumItemsToList", typeof(int), false, new ConstantValueProvider(_visualFunction.MaximumItemsToList), StandardWidgetFunctions.IntegerTextBoxWidget, "Item list length", new HelpDefinition("The maximum number of items to show. Default value is " + _visualFunction.MaximumItemsToList.ToString()));
                    yield return new ParameterProfile("OrderbyFieldName", typeof(string), false, new ConstantValueProvider(_visualFunction.OrderbyFieldName), fieldsDropDown, "Item sorting", new HelpDefinition("The field to use when sorting items. Use '(random)' to show random items. Default value is " + _visualFunction.OrderbyFieldName));
                    yield return new ParameterProfile("OrderbyAscending", typeof(bool), false, new ConstantValueProvider(_visualFunction.OrderbyAscending), StandardWidgetFunctions.CheckBoxWidget, "Sort ascending", new HelpDefinition("When checked items are sorted in ascending order (alphabetically, chronological). This field is ignored when '(random)' sorting is active. Default value is " + _visualFunction.OrderbyAscending.ToString()));
                }
            }



            public static IEnumerable<string> OrderByFieldNames(string typeManagerName)
            {
                yield return "(random)";

                Type interfaceType = TypeManager.GetType(typeManagerName);
                foreach (DataFieldDescriptor dataField in DynamicTypeManager.GetDataTypeDescriptor(interfaceType).Fields.OrderBy(f => f.Position))
                {
                    yield return dataField.Name;
                }
            }


            public EntityToken EntityToken
            {
                get
                {
                    return _visualFunction.GetDataEntityToken();
                }
            }


            private class RuntimeVisualFunction : IVisualFunction
            {
                private IVisualFunction _function;
                private int _maximumItemsToList;
                private string _orderbyFieldName;
                private bool _orderbyAscending;

                public RuntimeVisualFunction(IVisualFunction function, int maximumItemsToList, string orderbyFieldName, bool orderbyAscending)
                {
                    _function = function;
                    _maximumItemsToList = maximumItemsToList;
                    _orderbyFieldName = orderbyFieldName;
                    _orderbyAscending = orderbyAscending;
                }

                public Guid Id 
                {
                    get
                    {
                        return _function.Id;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

                public string Name
                {
                    get
                    {
                        return _function.Name;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

                public string Namespace
                {
                    get
                    {
                        return _function.Namespace;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

                public string XhtmlTemplate
                {
                    get
                    {
                        return _function.XhtmlTemplate;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

                public int MaximumItemsToList
                {
                    get
                    {
                        return _maximumItemsToList;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

                public string OrderbyFieldName
                {
                    get
                    {
                        return _orderbyFieldName;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

                public bool OrderbyAscending
                {
                    get
                    {
                        return _orderbyAscending;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }


                public DataSourceId DataSourceId
                {
                    get { throw new NotImplementedException(); }
                }

                public string TypeManagerName
                {
                    get
                    {
                        return _function.TypeManagerName;
                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }


                public string Description
                {
                    get
                    {
                        return _function.Description;

                    }
                    set
                    {
                        throw new NotImplementedException();
                    }
                }

            }

        }

    }



    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    internal sealed class VisualFunctionProviderData : FunctionProviderData
    {
    }
}
