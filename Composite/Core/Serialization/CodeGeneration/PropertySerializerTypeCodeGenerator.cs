using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using Composite.Core.Serialization.CodeGeneration.Foundation;
using Composite.Core.Types;


namespace Composite.Core.Serialization.CodeGeneration
{
    /// <summary>
    /// This class creates the CodeDOM for a given property class
    /// </summary>
    internal static class PropertySerializerTypeCodeGenerator
    {
        private const string NamespaceName = "CompositeGenerated.PropertySerializers";


        internal static void AddPropertySerializerTypeCode(CodeGenerationBuilder codeGenerationBuilder, Type propertyClassType)
        {
            codeGenerationBuilder.AddReference(propertyClassType.Assembly);
            codeGenerationBuilder.AddReference(typeof(EditorBrowsableAttribute).Assembly);
            codeGenerationBuilder.AddReference(typeof(StringConversionServices).Assembly);

            CodeTypeDeclaration codeTypeDeclaration = CreateCodeTypeDeclaration(propertyClassType);

            codeGenerationBuilder.AddType(NamespaceName, codeTypeDeclaration);
        }



        internal static void AddPropertySerializerTypeCode(CodeGenerationBuilder codeGenerationBuilder, string propertyClassTypeName, Dictionary<string, Type> properties)
        {
            codeGenerationBuilder.AddReference(typeof(EditorBrowsableAttribute).Assembly);
            codeGenerationBuilder.AddReference(typeof(StringConversionServices).Assembly);

            CodeTypeDeclaration codeTypeDeclaration = CreateCodeTypeDeclaration(propertyClassTypeName, properties);

            codeGenerationBuilder.AddType(NamespaceName, codeTypeDeclaration);
        }



        internal static string CreateSerializerClassFullName(Type propertyClassType)
        {
            return NamespaceName + "." + CreateSerializerClassName(propertyClassType.FullName);
        }        



        private static string CreateSerializerClassName(Type propertyClassType)
        {
            return CreateSerializerClassName(propertyClassType.FullName);
        }
        


        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(Type propertyClassType)
        {
            Dictionary<string, Type> properties = GetSerializeableProperties(propertyClassType).ToDictionary(f => f.Name, f => f.PropertyType);

            return CreateCodeTypeDeclaration(propertyClassType.FullName, properties);
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(string propertyClassTypeName, Dictionary<string, Type> properties)
        {
            string className = CreateSerializerClassName(propertyClassTypeName);

            CodeTypeDeclaration declaration = new CodeTypeDeclaration(className);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(ISerializer));
            declaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(EditorBrowsableAttribute)),
                    new CodeAttributeArgument(
                        new CodeFieldReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(EditorBrowsableState)),
                            EditorBrowsableState.Never.ToString()
                        )
                    )
                )
            );

            AddSerializeMethod(declaration, propertyClassTypeName, properties);
            AddDeserializeMethod(declaration, propertyClassTypeName, properties);

            return declaration;
        }



        private static void AddSerializeMethod(CodeTypeDeclaration declaration, string propertyClassTypeName, Dictionary<string, Type> properties)
        {
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "Serialize";
            method.ReturnType = new CodeTypeReference(typeof(void));
            method.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), "propertyClass"));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(StringBuilder), "serializedValues"));


            method.Statements.Add(new CodeVariableDeclarationStatement(
                    propertyClassTypeName,
                    "classToSerialize"
                ));

            method.Statements.Add(new CodeTryCatchFinallyStatement(
                    new CodeStatement[] {
                            new CodeAssignStatement(
                                new CodeVariableReferenceExpression("classToSerialize"),
                                new CodeCastExpression(
                                    propertyClassTypeName,
                                    new CodeVariableReferenceExpression("propertyClass"))
                            )
                    },
                    new CodeCatchClause[] {
                         new CodeCatchClause("e", new CodeTypeReference(typeof(Exception)), new CodeStatement[] {
                            new CodeThrowExceptionStatement(
                                new CodeObjectCreateExpression(
                                    new CodeTypeReference(typeof(ArgumentException)),
                                    new CodeExpression[] {
                                        new CodePrimitiveExpression(
                                            string.Format("The supplied propertyClass is not of type '{0}'", propertyClassTypeName)
                                        ),
                                        new CodeVariableReferenceExpression("e")
                                    }                                    
                                )
                            )
                        })
                    }
                ));


            bool isFirst = true;
            foreach (var property in properties)
            {
                if (isFirst)
                {
                    isFirst = false;
                }
                else
                {
                    method.Statements.Add(new CodeExpressionStatement(
                            new CodeMethodInvokeExpression(
                                new CodeVariableReferenceExpression("serializedValues"),
                                "Append",
                                new CodeExpression[] {
                                    new CodePrimitiveExpression(", ")        
                                }
                            )
                        ));
                }

                Type propertyType;
                string methodName;
                if (property.Value.IsArray == false)
                {
                    propertyType = property.Value;
                    methodName = "SerializeKeyValuePair";
                }
                else
                {
                    propertyType = property.Value.GetElementType();
                    methodName = "SerializeKeyValueArrayPair";
                }

                method.Statements.Add(new CodeExpressionStatement(
                        new CodeMethodInvokeExpression(
                            new CodeMethodReferenceExpression(
                                new CodeTypeReferenceExpression(typeof(StringConversionServices)),
                                methodName,
                                new CodeTypeReference[] {
                                    new CodeTypeReference(propertyType), 
                                }
                            ),
                            new CodeExpression[] {
                                new CodeVariableReferenceExpression("serializedValues"),
                                new CodePrimitiveExpression(property.Key),
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression("classToSerialize"),
                                    property.Key
                                )
                            }
                        )
                    ));
            }


            declaration.Members.Add(method);
        }



        private static void AddDeserializeMethod(CodeTypeDeclaration declaration, string propertyClassTypeName, Dictionary<string, Type> properties)
        {
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "Deserialize";
            method.ReturnType = new CodeTypeReference(typeof(object));
            method.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(Dictionary<string, string>), "objectState"));


            method.Statements.Add(new CodeVariableDeclarationStatement(
                    propertyClassTypeName,
                    "propertyClass",
                    new CodeObjectCreateExpression(propertyClassTypeName)
                ));


            foreach (var property in properties)
            {
                Type propertyType;
                string methodName;
                if (property.Value.IsArray == false)
                {
                    propertyType = property.Value;
                    methodName = "DeserializeValue";
                }
                else
                {
                    propertyType = property.Value.GetElementType();
                    methodName = "DeserializeValueArray";
                }


                method.Statements.Add(new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression("propertyClass"),
                            property.Key
                        ),
                        new CodeMethodInvokeExpression(
                            new CodeMethodReferenceExpression(
                                new CodeTypeReferenceExpression(typeof(StringConversionServices)),
                                methodName,
                                new CodeTypeReference[] {
                                    new CodeTypeReference(propertyType), 
                                }
                            ),
                            new CodeExpression[] {
                                new CodeArrayIndexerExpression(
                                    new CodeVariableReferenceExpression("objectState"),
                                    new CodeExpression[] {
                                        new CodePrimitiveExpression(
                                            property.Key
                                        )    
                                    }
                                ),
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression("propertyClass"),
                                    property.Key
                                )
                            }
                        )
                    ));
            }


            method.Statements.Add(new CodeMethodReturnStatement(
                    new CodeVariableReferenceExpression("propertyClass")
                ));


            declaration.Members.Add(method);
        }



        private static List<PropertyInfo> GetSerializeableProperties(Type type)
        {
            List<PropertyInfo> serializeableProperties = new List<PropertyInfo>();

            PropertyInfo[] properties = type.GetProperties();

            foreach (PropertyInfo property in properties)
            {
                if (UseableForSerialization(property))
                {
                    serializeableProperties.Add(property);
                }
                else
                {
                    throw new SerializationException(string.Format("Property {1} on type {0} has type {2} which is not serializeable.", type.FullName, property.Name, property.PropertyType));
                }
            }

            return serializeableProperties;
        }



        private static bool UseableForSerialization(PropertyInfo property)
        {
            bool isUseable = property.CanRead && property.CanWrite;

            if (isUseable)
            {
                foreach (MethodInfo mi in property.GetAccessors(false))
                {
                    isUseable = isUseable && mi.IsPublic;
                }
            }

            isUseable = isUseable && TypeUseableForSerialization(property.PropertyType);

            return isUseable;
        }              



        private static bool TypeUseableForSerialization(Type propertyType)
        {
            if (propertyType.IsSerializable == false)
            {
                return false;
            }

            if (propertyType.IsAbstract && (propertyType.Equals(typeof(Type)) == false))
            {
                return false;
            }

            if (propertyType.IsCOMObject || propertyType.IsGenericType || propertyType.IsInterface)
            {
                return false;
            }

            return true;
        }



        private static string CreateSerializerClassName(string propertyClassTypeFullName)
        {
            return string.Format("{0}CustomSerializer", propertyClassTypeFullName.Replace('.', '_').Replace('+', '_'));
        }
    }
}
