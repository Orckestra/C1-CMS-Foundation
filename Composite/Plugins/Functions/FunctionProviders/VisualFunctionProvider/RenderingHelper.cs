using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Types;
using Composite.Core.WebClient.Renderings.Data;
using Composite.Core.Xml;
using System.Web;


namespace Composite.Plugins.Functions.FunctionProviders.VisualFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class RenderingHelper
    {
        /// <exclude />
        public static XhtmlDocument RenderCompleteDataList(IVisualFunction function, XhtmlDocument xhtmlDocument, DataTypeDescriptor typeDescriptor, FunctionContextContainer functionContextContainer)
        {
            Type typeofClassWithGenericStaticMethod = typeof(RenderingHelper);

            // Grabbing the specific static method
            MethodInfo methodInfo = typeofClassWithGenericStaticMethod.GetMethod("RenderCompleteDataListImpl", System.Reflection.BindingFlags.Static | BindingFlags.NonPublic);

            // Binding the method info to generic arguments
            Type[] genericArguments = new Type[] { typeDescriptor.GetInterfaceType() };
            MethodInfo genericMethodInfo = methodInfo.MakeGenericMethod(genericArguments);

            // Simply invoking the method and passing parameters
            // The null parameter is the object to call the method from. Since the method is
            // static, pass null.
            return (XhtmlDocument)genericMethodInfo.Invoke(null, new object[] { function, xhtmlDocument, typeDescriptor, functionContextContainer });
        }


        private static XhtmlDocument RenderCompleteDataListImpl<T>(IVisualFunction function, XhtmlDocument xhtmlDocument, DataTypeDescriptor typeDescriptor, FunctionContextContainer functionContextContainer)
            where T : class, IData
        {
            Expression<Func<T, bool>> filter = f => true;

            return RenderDataList<T>(function, xhtmlDocument, typeDescriptor, functionContextContainer, filter);
        }



        /// <exclude />
        public static XhtmlDocument RenderDataList<T>(IVisualFunction function, XhtmlDocument xhtmlDocument, DataTypeDescriptor typeDescriptor, FunctionContextContainer functionContextContainer, Expression<Func<T, bool>> filter)
            where T : class, IData
        {
            if (function == null) throw new ArgumentNullException("function");
            if (xhtmlDocument == null) throw new ArgumentNullException("xhtmlDocument");
            if (typeDescriptor == null) throw new ArgumentNullException("typeDescriptor");
            if (functionContextContainer == null) throw new ArgumentNullException("functionContextContainer");

            Type dataType = typeDescriptor.GetInterfaceType();

            if (dataType == null)
            {
                throw new InvalidOperationException(string.Format("'{0}' is not a known type manager type.", typeDescriptor.TypeManagerTypeName));
            }

            List<T> allData = DataFacade.GetData<T>(filter).ToList();

            List<T> itemsToList;

            if (function.OrderbyFieldName == "(random)")
            {
                int itemsInList = allData.Count();
                int itemsToFetch = Math.Min(itemsInList, function.MaximumItemsToList);

                itemsToList = new List<T>();

                while (itemsToFetch > 0)
                {

                    int itemToGet = (Math.Abs(Guid.NewGuid().GetHashCode()) % itemsInList); // (new Random()).Next(0, itemsInList);

                    itemsToList.Add(allData[itemToGet]);
                    allData.RemoveAt(itemToGet);

                    itemsToFetch--;
                    itemsInList--;
                }
            }
            else
            {
                IComparer<T> comparer = GenericComparer<T>.Build(typeDescriptor.GetInterfaceType(), function.OrderbyFieldName, function.OrderbyAscending);
                allData.Sort(comparer);

                itemsToList = allData.Take(function.MaximumItemsToList).ToList();
            }

            return RenderDataListImpl<T>(xhtmlDocument, typeDescriptor, itemsToList, functionContextContainer);
        }





        private static XhtmlDocument RenderDataListImpl<T>(XhtmlDocument templateDocument, DataTypeDescriptor typeDescriptor, List<T> dataList, FunctionContextContainer functionContextContainer)
            where T : class, IData
        {
            XhtmlDocument outputDocument = new XhtmlDocument();

            if (dataList.Count > 0)
            {
                Type interfaceType = typeDescriptor.GetInterfaceType();
                XElement templateBody = new XElement(templateDocument.Body);

                Dictionary<string, PropertyInfo> propertyInfoLookup =
                    interfaceType.GetPropertiesRecursively(p => typeof(IData).IsAssignableFrom(p.DeclaringType)).ToList().ToDictionary(p => p.Name);

                List<string> fieldsWithReferenceRendering = new List<string>();

                foreach (PropertyInfo dataPropertyInfo in propertyInfoLookup.Values)
                {
                    Type referencedType = null;
                    if (dataPropertyInfo.TryGetReferenceType(out referencedType))
                    {
                        bool canRender = DataXhtmlRenderingServices.CanRender(referencedType, XhtmlRenderingType.Embedable);

                        if (canRender)
                        {
                            fieldsWithReferenceRendering.Add(dataPropertyInfo.Name);
                        }
                    }
                }


                // any optimization would do wonders
                foreach (IData data in dataList)
                {
                    XElement currentRowElementsContainer = new XElement(templateBody);

                    List<DynamicTypeMarkupServices.FieldReferenceDefinition> references =
                        DynamicTypeMarkupServices.GetFieldReferenceDefinitions(currentRowElementsContainer, typeDescriptor.TypeManagerTypeName).ToList();

                    // perf waste - if some props are not used;
                    Dictionary<string, object> objectValues =
                        propertyInfoLookup.ToDictionary(f => f.Key, f => f.Value.GetValue(data, new object[] { }));

                    foreach (DynamicTypeMarkupServices.FieldReferenceDefinition reference in references)
                    {
                        object value = null;

                        if (fieldsWithReferenceRendering.Contains(reference.FieldName))
                        {
                            // reference field with rendering...
                            Type referencedType = null;
                            if (propertyInfoLookup[reference.FieldName].TryGetReferenceType(out referencedType))
                            {
                                if (objectValues[reference.FieldName] != null)
                                {
                                    IDataReference dataReference = DataReferenceFacade.BuildDataReference(referencedType, objectValues[reference.FieldName]);
                                    try
                                    {
                                        value = DataXhtmlRenderingServices.Render(dataReference, XhtmlRenderingType.Embedable).Root;
                                    }
                                    catch (Exception)
                                    {
                                        value = objectValues[reference.FieldName];
                                    }
                                }
                            }
                        }
                        else
                        {
                            if (objectValues.ContainsKey(reference.FieldName)) // prevents unknown props from creating exceptions
                            {
                                value = objectValues[reference.FieldName];
                            }
                        }

                        if (value!=null)
                        {
                            if (value.GetType() == typeof(DateTime))
                            {
                                DateTime dateTimeValue = (DateTime)value;

                                if (dateTimeValue.TimeOfDay.TotalSeconds > 0)
                                {
                                    value = string.Format("{0} {1}", dateTimeValue.ToShortDateString(), dateTimeValue.ToShortDateString());
                                }
                                else
                                {
                                    value = dateTimeValue.ToShortDateString();
                                }
                            }

                            if (value.GetType() == typeof(string))
                            {
                                string stringValue = (string)value;

                                if (stringValue.StartsWith("<html") && stringValue.Contains(Namespaces.Xhtml.NamespaceName))
                                {
                                    try
                                    {
                                        value = XElement.Parse(stringValue);
                                    }
                                    catch { }
                                }
                                else if (stringValue.Contains('\n'))
                                {
                                    string valueEncodedWithBr = HttpUtility.HtmlEncode(stringValue).Replace("\n", "<br/>");
                                    value = XElement.Parse(string.Format("<body xmlns='{0}'>{1}</body>", Namespaces.Xhtml, valueEncodedWithBr)).Nodes();
                                }
                            }
                        }


                        reference.FieldReferenceElement.ReplaceWith(value);
                    }

                    FunctionContextContainer fcc = new FunctionContextContainer(functionContextContainer, objectValues);

                    PageRenderer.ExecuteEmbeddedFunctions(currentRowElementsContainer, fcc);

                    outputDocument.Body.Add(currentRowElementsContainer.Elements());
                }
            }

            return outputDocument;
        }
    }
}
