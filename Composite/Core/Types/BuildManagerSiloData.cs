using System;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Logging;


namespace Composite.Core.Types
{
    [DebuggerDisplay("TargetTypeFullName = {TargetTypeFullName}")]
    internal sealed class BuildManagerSiloData
    {
        public BuildManagerSiloData(CodeNamespace codeNamespace, CodeTypeDeclaration codeTypeDeclaration, CompilerParameters compilerParameters)
        {
            this.CodeNamespace = codeNamespace;
            this.CodeTypeDeclaration = codeTypeDeclaration;
            this.CompilerParameters = compilerParameters;

            Initialize();
        }

        public CodeNamespace CodeNamespace { get; private set; }
        public CodeTypeDeclaration CodeTypeDeclaration { get; private set; }
        public CompilerParameters CompilerParameters { get; private set; }

        public string TargetTypeFullName { get; private set; }
        public List<BuildManagerPropertyInfo> TargetTypeProperties { get; private set; }
        public List<Type> TargetTypeBaseTypes { get; private set; }

        private List<BuildManagerPropertyInfo> _targetTypeRecursiveInterfaceProperties = null;

        public IEnumerable<BuildManagerPropertyInfo> TargetTypeRecursiveInterfaceProperties
        {
            get
            {
                if (_targetTypeRecursiveInterfaceProperties == null)
                {
                    _targetTypeRecursiveInterfaceProperties = new List<BuildManagerPropertyInfo>();

                    foreach (Type baseType in this.TargetTypeBaseTypes)
                    {
                        if (baseType.IsInterface == true)
                        {
                            foreach (PropertyInfo propertyInfo in baseType.GetPropertiesRecursively())
                            {
                                BuildManagerPropertyInfo buildManagerPropertyInfo = new BuildManagerPropertyInfo(propertyInfo);

                                if (_targetTypeRecursiveInterfaceProperties.Contains(buildManagerPropertyInfo) == false)
                                {
                                    _targetTypeRecursiveInterfaceProperties.Add(buildManagerPropertyInfo);
                                }
                            }
                        }
                    }
                }

                foreach (BuildManagerPropertyInfo buildManagerPropertyInfo in this.TargetTypeProperties)
                {
                    yield return buildManagerPropertyInfo;
                }

                foreach (BuildManagerPropertyInfo buildManagerPropertyInfo in _targetTypeRecursiveInterfaceProperties)
                {
                    yield return buildManagerPropertyInfo;
                }
            }
        }


        private void Initialize()
        {
            this.TargetTypeProperties = new List<BuildManagerPropertyInfo>();
            this.TargetTypeBaseTypes = new List<Type>();

            this.TargetTypeFullName = StringExtensionMethods.CreateNamespace(this.CodeNamespace.Name, this.CodeTypeDeclaration.Name);

            foreach (CodeTypeMember codeTypeMember in this.CodeTypeDeclaration.Members)
            {
                CodeMemberProperty codeMemberProperty = codeTypeMember as CodeMemberProperty;
                if (codeMemberProperty != null)
                {
                    Type type = FindType(codeMemberProperty.Type);

                    IEnumerable<object> propertyCustomAttributes = FindCustomAttributes(codeMemberProperty);

                    BuildManagerPropertyInfo buildManagerPropertyInfo = new BuildManagerPropertyInfo(
                        codeMemberProperty.Name,
                        type,
                        this.TargetTypeFullName,
                        codeMemberProperty.HasGet,
                        codeMemberProperty.HasSet,
                        propertyCustomAttributes);

                    this.TargetTypeProperties.Add(buildManagerPropertyInfo);
                }
            }

            foreach (CodeTypeReference codeTypeReference in this.CodeTypeDeclaration.BaseTypes)
            {
                Type type = FindType(codeTypeReference);

                this.TargetTypeBaseTypes.Add(type);
            }
        }



        public IEnumerable<object> FindCustomAttributes(CodeMemberProperty codeMemberProperty)
        {
            foreach (CodeAttributeDeclaration codeAttributeDeclaration in codeMemberProperty.CustomAttributes)
            {
                Type attributeType = FindType(codeAttributeDeclaration.AttributeType);

                List<object> arguments = new List<object>();
                Dictionary<string, object> namedArguments = new Dictionary<string, object>();
                foreach (CodeAttributeArgument codeAttributeArgument in codeAttributeDeclaration.Arguments)
                {
                    object value;
                    if ((codeAttributeArgument.Value is CodePrimitiveExpression) == true)
                    {
                        CodePrimitiveExpression codePrimitiveExpression = codeAttributeArgument.Value as CodePrimitiveExpression;

                        value = codePrimitiveExpression.Value;
                    }
                    else if ((codeAttributeArgument.Value is CodeTypeOfExpression) == true)
                    {
                        CodeTypeOfExpression codeTypeOfExpression = codeAttributeArgument.Value as CodeTypeOfExpression;

                        Type typeofType = FindType(codeTypeOfExpression.Type);

                        value = typeofType;
                    }
                    else if ((codeAttributeArgument.Value is CodeFieldReferenceExpression) == true)
                    {
                        CodeFieldReferenceExpression codeFieldReferenceExpression = codeAttributeArgument.Value as CodeFieldReferenceExpression;

                        CodeTypeReferenceExpression codeTypeReferenceExpression = codeFieldReferenceExpression.TargetObject as CodeTypeReferenceExpression;
                        if (codeTypeReferenceExpression == null) throw new InvalidOperationException("Only CodeTypeReferenceExpression supported");

                        Type targetType = FindType(codeTypeReferenceExpression.Type);
                        FieldInfo fieldInfo = targetType.GetField(codeFieldReferenceExpression.FieldName);

                        object fieldInfoValue = fieldInfo.GetValue(null);

                        value = fieldInfoValue;
                    }
                    else if ((codeAttributeArgument.Value is CodePropertyReferenceExpression) == true)
                    {
                        CodePropertyReferenceExpression codePropertyReferenceExpression = codeAttributeArgument.Value as CodePropertyReferenceExpression;

                        CodeTypeReferenceExpression codeTypeReferenceExpression = codePropertyReferenceExpression.TargetObject as CodeTypeReferenceExpression;
                        if (codeTypeReferenceExpression == null) throw new InvalidOperationException("Only CodeTypeReferenceExpression supported");

                        Type targetType = FindType(codeTypeReferenceExpression.Type);

                        if (targetType.IsEnum == true)
                        {
                            FieldInfo fieldInfo = targetType.GetField(codePropertyReferenceExpression.PropertyName);

                            object fieldInfoValue = fieldInfo.GetValue(null);

                            value = fieldInfoValue;
                        }
                        else if (targetType.IsClass == true)
                        {
                            PropertyInfo propertyInfo = targetType.GetProperty(codePropertyReferenceExpression.PropertyName, BindingFlags.Public | BindingFlags.Static);

                            object propertyInfoValue = propertyInfo.GetValue(null, null);

                            value = propertyInfoValue;
                        }
                        else
                        {
                            throw new InvalidOperationException("Only CodePropertyReferenceExpression to enums and classes are supported");
                        }
                    }
                    else
                    {
                        throw new InvalidOperationException("Only CodePrimitiveExpression, CodeTypeOfExpression, CodePropertyReferenceExpression, and CodeFieldReferenceExpression supported");
                    }

                    if (string.IsNullOrEmpty(codeAttributeArgument.Name) == true)
                    {
                        arguments.Add(value);
                    }
                    else
                    {
                        namedArguments.Add(codeAttributeArgument.Name, value);
                    }
                }

                object attribute = Activator.CreateInstance(attributeType, arguments.ToArray());

                foreach (var namedArguemnt in namedArguments)
                {
                    PropertyInfo propertyInfo = attributeType.GetProperty(namedArguemnt.Key, BindingFlags.Public | BindingFlags.Instance);

                    if (propertyInfo == null) throw new NotSupportedException();

                    propertyInfo.SetValue(attribute, namedArguemnt.Value, null);
                }

                yield return attribute;
            }
        }



        private Type FindType(CodeTypeReference codeTypeReference)
        {
            Type type = TryFindType(codeTypeReference);

            if (type == null) throw new InvalidOperationException(string.Format("The type '{0}' could not be located", codeTypeReference.BaseType));

            return type;
        }



        private Type TryFindType(CodeTypeReference codeTypeReference)
        {
            if ((codeTypeReference.ArrayRank != 0) ||
                (codeTypeReference.ArrayElementType != null))
            {
                throw new NotSupportedException("Arrays not supported");
            }


            Type type = Type.GetType(codeTypeReference.BaseType);

            if (type == null)
            {
                type = FindType(codeTypeReference.BaseType);
            }

            if (type == null) return null;


            if (codeTypeReference.TypeArguments.Count != 0)
            {
                List<Type> typeArgumentTypes = new List<Type>();
                foreach (CodeTypeReference typeArgumentCodeTypeReference in codeTypeReference.TypeArguments)
                {
                    Type typeArgumentType = TryFindType(typeArgumentCodeTypeReference);

                    if (typeArgumentType == null) return null;

                    typeArgumentTypes.Add(typeArgumentType);
                }

                type = type.MakeGenericType(typeArgumentTypes.ToArray());
            }

            return type;
        }



        private Type FindType(string fullname)
        {
            foreach (string assemblyFileName in this.CompilerParameters.ReferencedAssemblies)
            {
                // This is for handling the NotImplementedException("The invoked member is not supported in a dynamic assembly.")
                Assembly assembly =
                    (from a in AppDomain.CurrentDomain.GetAssemblies()
                     where a.GetType().Name != "InternalAssemblyBuilder" &&
                           a.CodeBase.ToLower().EndsWith(Path.GetFileName(assemblyFileName).ToLower()) == true
                     select a).FirstOrDefault();

                if (assembly != null)
                {
                    Type type = null;
                    try
                    {
                        type =
                            (from t in assembly.GetTypes()
                             where t.FullName == fullname
                             select t).SingleOrDefault();
                    }
                    catch (ReflectionTypeLoadException)
                    {
                        LoggingService.LogWarning("BuildManager", string.Format("Failed to load assembly '{0}'. Typical reason is version mismatch. Assembly is ignored.", assemblyFileName));
                    }

                    if (type != null)
                    {
                        return type;
                    }
                }
            }

            throw new NotImplementedException(string.Format("The type '{0}' could not be located", fullname));
        }
    }
}
