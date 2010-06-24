using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Serialization.CodeGeneration.Foundation;
using Composite.Types;
using Composite.Logging;


namespace Composite.Serialization.CodeGeneration
{
    internal static class SerializerGenerator
    {
        private const string _namespaceName = "Composite.Data.GeneratedTypes";
        private const string _compileUnitId = "Composite.Data.CustomSerializers";


        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);



        static SerializerGenerator()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static ISerializer CreateSerializer(Type propertyClassType)
        {
            Type serializerType = CreateType(propertyClassType);

            return (ISerializer)Activator.CreateInstance(serializerType);
        }



        public static Type CreateType(Type propertyClassType)
        {
            Type serializerType;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.SerializersTypesCache.TryGetValue(propertyClassType, out serializerType) == false)
                {
                    _resourceLocker.Resources.SerializersTypesCache.RemoveOldVersion(propertyClassType);

                    serializerType = GenerateType(propertyClassType);

                    _resourceLocker.Resources.SerializersTypesCache.Add(propertyClassType, serializerType);
                }
            }

            return serializerType;
        }



        internal static void AddSerializerType(Type propertyClassType, Type serializerType)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.SerializersTypesCache.ContainsKey(propertyClassType) == false)
                {
                    _resourceLocker.Resources.SerializersTypesCache.RemoveOldVersion(propertyClassType);

                    _resourceLocker.Resources.SerializersTypesCache.Add(propertyClassType, serializerType);
                }
            }
        }



        private static Type GenerateType(Type propertyClassType)
        {
            string compileUnitId = CreateCompileUnitId(propertyClassType);
            string fingerprint = propertyClassType.Assembly.FullName;

            BuildManagerCompileUnit buildManagerCompileUnit = new BuildManagerCompileUnit(compileUnitId, fingerprint);

            buildManagerCompileUnit.AddType(
                new BuildManagerCompileType(
                    _namespaceName,
                    new KeyValuePair<string, Func<CodeTypeDeclaration>>(
                        CreateSerializerClassName(propertyClassType.FullName),
                        () => CreateCodeTypeDeclaration(propertyClassType))));

            buildManagerCompileUnit.AddAssemblyReference(typeof(StringConversionServices).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(propertyClassType.Assembly);
            foreach (Type superInterfaceType in propertyClassType.GetInterfaces())
            {
                buildManagerCompileUnit.AddAssemblyReference(superInterfaceType.Assembly);
            }

            BuildManager.GetCompiledTypes(buildManagerCompileUnit);

            string className = CreateSerializerClassName(propertyClassType);

            return buildManagerCompileUnit.GetGeneretedTypeByName(className);
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(Type propertyClassType)
        {
            Dictionary<string, Type> properties = GetSerializeableProperties(propertyClassType).ToDictionary(f => f.Name, f => f.PropertyType);

            return CreateCodeTypeDeclaration(propertyClassType.FullName, properties);
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(BuildManagerSiloData buildManagerSiloData)
        {
            Dictionary<string, Type> properties = GetSerializeableProperties(buildManagerSiloData.TargetTypeProperties).ToDictionary(f => f.Name, f => f.PropertyType);

            return CreateCodeTypeDeclaration(buildManagerSiloData.TargetTypeFullName, properties);
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(string propertyClassTypeName, Dictionary<string, Type> properties)
        {
            string className = CreateSerializerClassName(propertyClassTypeName);

            CodeTypeDeclaration declaration = new CodeTypeDeclaration(className);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(ISerializer));

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
                if (isFirst == true)
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

            if (isUseable == true)
            {
                foreach (MethodInfo mi in property.GetAccessors(false))
                {
                    isUseable = isUseable && mi.IsPublic;
                }
            }

            isUseable = isUseable && TypeUseableForSerialization(property.PropertyType);

            return isUseable;
        }



        private static IEnumerable<BuildManagerPropertyInfo> GetSerializeableProperties(IEnumerable<BuildManagerPropertyInfo> buildManagerPropertyInfos)
        {
            if (buildManagerPropertyInfos == null) throw new ArgumentNullException("buildManagerPropertyInfos");

            foreach (BuildManagerPropertyInfo buildManagerPropertyInfo in buildManagerPropertyInfos)
            {
                if (UseableForSerialization(buildManagerPropertyInfo) == true)
                {
                    yield return buildManagerPropertyInfo;
                }
            }
        }



        private static bool UseableForSerialization(BuildManagerPropertyInfo buildManagerPropertyInfo)
        {
            bool isUseable = buildManagerPropertyInfo.CanRead && buildManagerPropertyInfo.CanWrite;

            //if (isUseable == true)
            //{
            //    foreach (MethodInfo mi in property.GetAccessors(false))
            //    {
            //        isUseable = isUseable && mi.IsPublic;
            //    }
            //}

            isUseable = isUseable && TypeUseableForSerialization(buildManagerPropertyInfo.PropertyType);

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


        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static string CreateCompileUnitId(Type propertyClassType)
        {
            return string.Format("{0}.{1}", _compileUnitId, CreateSerializerClassName(propertyClassType));
        }



        private static string CreateSerializerClassName(Type propertyClassType)
        {
            return CreateSerializerClassName(propertyClassType.FullName);
        }



        private static string CreateSerializerClassName(string propertyClassTypeName)
        {
            return string.Format("{0}CustomSerializer", propertyClassTypeName.Replace('.', '_').Replace('+', '_'));
        }



        private sealed class Resources
        {
            public DynamicBuildManagetTypeCache<Type> SerializersTypesCache;

            public static void Initialize(Resources resources)
            {
                resources.SerializersTypesCache = new DynamicBuildManagetTypeCache<Type>();
            }
        }
    }
}
