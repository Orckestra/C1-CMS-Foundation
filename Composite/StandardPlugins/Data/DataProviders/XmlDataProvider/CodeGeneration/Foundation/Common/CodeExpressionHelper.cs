using System;
using System.CodeDom;
using System.Linq.Expressions;
using System.Xml.Linq;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation.Common
{
    internal static class CodeExpressionHelper
    {
        public static CodeExpression CreateDataIdCompareExpression(PropertyList propertyList, string parameterVariableName, string dataIdVariableName)
        {
            CodeExpression currentExpression = null;
            foreach (Property property in propertyList.DataIdProperties)
            {
                CodeExpression leftInnerCodeExpression = 
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Expression)),
                        "Call",
                        new CodeExpression[] {
                            new CodePrimitiveExpression(null),
                            //new CodeVariableReferenceExpression(parameterVariableName),
                            new CodeMethodInvokeExpression(
                                new CodeTypeReferenceExpression(typeof(GeneretedClassesMethodCache)),
                                "GetExplicitCastXAttribute",
                                new CodeExpression[] {
                                    new CodeTypeOfExpression(property.Type)
                                }
                            ),                            
                            new CodeArrayCreateExpression(typeof(Expression),
                                new CodeExpression[] {                                    
                                    new CodeMethodInvokeExpression(
                                        new CodeTypeReferenceExpression(typeof(Expression)),
                                        "Call",
                                        new CodeExpression[] {
                                            new CodeVariableReferenceExpression(parameterVariableName),
                                            new CodePropertyReferenceExpression(
                                                new CodeTypeReferenceExpression(typeof(GeneretedClassesMethodCache)),
                                                "XElementAttributeMethod"
                                            ),                                    
                                            new CodeArrayCreateExpression(
                                                typeof(Expression),
                                                new CodeExpression[] {
                                                    new CodeMethodInvokeExpression(
                                                        new CodeTypeReferenceExpression(typeof(Expression)),
                                                        "Constant",
                                                        new CodeExpression[] {
                                                            new CodeCastExpression(
                                                                typeof(XName),
                                                                new CodePrimitiveExpression(property.MappedName)
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    );


                CodeExpression rightInnerCodeExpression;
                if (property.Type == typeof(Guid))
                {
                    leftInnerCodeExpression = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Call",
                            new CodeExpression[] {
                                new CodeMethodInvokeExpression(
                                    new CodeTypeReferenceExpression(typeof(Expression)),
                                    "Constant",
                                    new CodeExpression[] {
                                        new CodePropertyReferenceExpression(
                                            new CodeVariableReferenceExpression(dataIdVariableName),
                                            property.Name
                                        )
                                    }
                                ),
                                new CodePropertyReferenceExpression(
                                    new CodeTypeReferenceExpression(typeof(GeneretedClassesMethodCache)),
                                    "GuidCompareTo"
                                ),                                
                                new CodeArrayCreateExpression(
                                    typeof(Expression),
                                    new CodeExpression[] {
                                        leftInnerCodeExpression
                                    }
                                )                                
                            }
                        );   
                  

                    rightInnerCodeExpression = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Constant",
                            new CodeExpression[] {
                                new CodePrimitiveExpression(0)
                            }
                        );
                }
                else
                {
                    rightInnerCodeExpression = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Constant",
                            new CodeExpression[] {
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression(dataIdVariableName),
                                    property.Name
                                )
                            }
                        );
                }

                CodeExpression equalExpression = new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Expression)),
                        "Equal",
                        new CodeExpression[] {
                            leftInnerCodeExpression,
                            rightInnerCodeExpression
                        }
                    );

                if (null != currentExpression)
                {
                    currentExpression = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "AndAlso",
                            new CodeExpression[] {
                                currentExpression,
                                equalExpression
                            }
                        );
                }
                else
                {
                    currentExpression = equalExpression;
                }               
            }

            return currentExpression;
        }
    }
}
