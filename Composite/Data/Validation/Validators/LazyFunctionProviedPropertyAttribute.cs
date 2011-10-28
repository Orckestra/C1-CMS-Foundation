using System;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core;
using Composite.Functions;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;


namespace Composite.Data.Validation.Validators
{
    /// <summary>
    /// This is for internal use only! It is a work around to function providing
    /// a IPropertyValidatorBuilder that provides CodeDOM when the data type
    /// interface is code generated. This means that the functions should
    /// be loaded BEFORE the interface is code generated, which is bad architecture.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Method | AttributeTargets.Parameter, AllowMultiple = true, Inherited = false)]
    public class LazyFunctionProviedPropertyAttribute : ValueValidatorAttribute
    {
        private static MethodInfo _doCreateValidatorMethodInfo;
        private string FunctionMarkup { get; set; }


        /// <summary>
        /// </summary>
        /// <param name="functionMarkup"></param>
        /// <exclude />
        public LazyFunctionProviedPropertyAttribute(string functionMarkup)
        {
            FunctionMarkup = functionMarkup;
        }


        protected override Validator DoCreateValidator(Type targetType)
        {
            try
            {
                BaseRuntimeTreeNode node = FunctionFacade.BuildTree(XElement.Parse(FunctionMarkup));
                
                IPropertyValidatorBuilder propertyValidatorBuilder = node.GetValue<IPropertyValidatorBuilder>();

                ValidatorAttribute validatorAttribute = (ValidatorAttribute)propertyValidatorBuilder.GetAttribute();

                Validator validator = (Validator)DoCreateValidatorMethodInfo.Invoke(validatorAttribute, new object[] { targetType });

                return validator;
            }
            catch (Exception ex)
            {
                string message = string.Format("Validator function markup parse / execution failed with the following error: '{0}'. The validator attribute is dropped.", ex.Message);
                Log.LogError("LazyFunctionProviedPropertyAttribute", message);
            }

            return new LazyFunctionProviedPropertyValidator();
        }



        private static MethodInfo DoCreateValidatorMethodInfo
        {
            get
            {
                if (_doCreateValidatorMethodInfo == null)
                {
                    _doCreateValidatorMethodInfo = 
                        typeof(ValidatorAttribute).GetMethods(BindingFlags.NonPublic | BindingFlags.Instance).
                        Where(f => f.Name == "DoCreateValidator" && f.GetParameters().Length == 1).
                        Single();
                }

                return _doCreateValidatorMethodInfo;
            }
        }
    }
}
