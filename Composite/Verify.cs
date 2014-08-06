using System;
using System.Collections.Generic;
using Composite.Core.Extensions;
using JetBrains.Annotations;


namespace Composite
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class Verify
    {
        /// <summary>
        /// Asserts that argument value is not null
        /// </summary>
        /// <param name="value">The argument's value.</param>
        /// <param name="paramName">The parameter's name.</param>
        /// <exception cref="ArgumentNullException"></exception>
        [AssertionMethod]
        public static void ArgumentNotNull([AssertionConditionAttribute(AssertionConditionType.IS_NOT_NULL)] object value, string paramName)
        {
            if (value == null)
            {
                ThrowArgumentNullException(paramName);
            }
        }

        /// <summary>
        /// Asserts that argument value is not null or emptry
        /// </summary>
        /// <param name="value">The argument's value.</param>
        /// <param name="paramName">The parameter's name.</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="ArgumentException"></exception>
        [AssertionMethod]
        public static void ArgumentNotNullOrEmpty([AssertionConditionAttribute(AssertionConditionType.IS_NOT_NULL)] string value, string paramName)
        {
            if (string.IsNullOrEmpty(value))
            {
                if (value == null)
                {
                    ThrowArgumentNullException(paramName);
                }
                ThrowArgumentException("Value cannot be String.Empty", paramName);
            }
        }

        /// <summary>
        /// Checks a condition.
        /// </summary>
        /// <param name="condition">A condition to check.</param>
        /// <param name="paramName">Parameter name.</param>
        /// <param name="message">The message.</param>
        /// <exception cref="ArgumentException"></exception>
        [AssertionMethod]
        public static void ArgumentCondition([AssertionConditionAttribute(AssertionConditionType.IS_TRUE)] bool condition, string paramName, string message)
        {
            if (!condition)
            {
                ThrowArgumentException(message, paramName);
            }
        }

        /// <summary>
        /// If condition isn't true, throws an <see cref="InvalidOperationException"/> exception.
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="message"></param>
        /// <exception cref="InvalidOperationException"></exception>
        [AssertionMethod]
        public static void IsTrue([AssertionConditionAttribute(AssertionConditionType.IS_TRUE)] bool condition, string message)
        {
            if (!condition)
            {
                ThrowInvalidOperationException(message);
            }
        }

        /// <summary>
        /// If condition is true, throws an <see cref="InvalidOperationException"/> exception.
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="message"></param>
        /// <exception cref="InvalidOperationException"></exception>
        [AssertionMethod]
        public static void IsFalse([AssertionConditionAttribute(AssertionConditionType.IS_FALSE)] bool condition, string message)
        {
            if (condition)
            {
                ThrowInvalidOperationException(message);
            }
        }

        /// <summary>
        /// If condition isn't true, throws an <see cref="InvalidOperationException"/> exception.
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="message"></param>
        /// <param name="formatArgs">Parameters for string.Format method.</param> 
        /// <exception cref="InvalidOperationException"></exception>
        [AssertionMethod]
        [StringFormatMethod("message")]
        public static void That([AssertionConditionAttribute(AssertionConditionType.IS_TRUE)] bool condition, string message, params object[] formatArgs)
        {
            if (!condition)
            {
                ThrowInvalidOperationException(message, formatArgs);
            }
        }

        /// <summary>
        /// Checks that the value is null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="message">The message to be an exception desctiption.</param>
        /// <exception cref="InvalidOperationException"></exception>
        [AssertionMethod]
        public static void IsNull([AssertionConditionAttribute(AssertionConditionType.IS_NULL)] object value, string message)
        {
            if (value != null)
                ThrowInvalidOperationException(message);
        }
        /// <summary>
        /// Checks that the value is not null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="message">The message to be an exception desctiption.</param>
        /// <exception cref="InvalidOperationException"></exception>
        [AssertionMethod]
        public static void IsNotNull([AssertionConditionAttribute(AssertionConditionType.IS_NOT_NULL)] object value, [NotNull] string message)
        {
            if (value == null)
                ThrowInvalidOperationException(message);
        }

        /// <summary>
        /// Checks that the value is not null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="message">The message to be an exception desctiption.</param>
        /// <param name="formattingArgs">Parameters for string.Format() method.</param>
        /// <exception cref="InvalidOperationException"></exception>
        [AssertionMethod]
        [StringFormatMethod("message")]
        public static void IsNotNull([AssertionConditionAttribute(AssertionConditionType.IS_NOT_NULL)] object value, string message, params object[] formattingArgs)
        {
            if (value == null)
                ThrowInvalidOperationException(message, formattingArgs);
        }

        #region Exception throwing

        /// <exception cref="InvalidOperationException"></exception>
        public static void ThrowInvalidOperationException(string message)
        {
            throw new InvalidOperationException(message);
        }

        private static void ThrowInvalidOperationException(string message, object[] formatArguments)
        {
            throw new InvalidOperationException(formatArguments.Length > 0 ? string.Format(message, formatArguments) : message);
        }

        /// <summary>
        /// Throws an "ThrowArgumentNullException" exception.
        /// </summary>
        /// <param name="parameterName">The parameter's name</param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void ThrowArgumentNullException(string parameterName)
        {
            throw new ArgumentNullException(parameterName);
        }

        /// <summary>
        /// Throws an "ThrowArgumentNullException" exception.
        /// </summary>
        /// <param name="parameterName">The parameter's name</param>
        /// <param name="message">The message.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void ThrowArgumentException(string message, string parameterName)
        {
            throw new ArgumentException(message, parameterName);
        }

        /// <exclude />
        public static T ResultNotNull<T>(T value) where T : class
        {
            return ResultNotNull(value, "Result value should not be null");
        }

        /// <exclude />
        [StringFormatMethod("errorMessageOnNull")]
        public static T ResultNotNull<T>(T value, string errorMessageOnNull, params object[] formattingArgs) where T : class
        {
            if (value == null) ThrowInvalidOperationException(errorMessageOnNull.FormatWith(formattingArgs));
            return value;
        }

        /// <exclude />
        [AssertionMethod]
        public static string StringNotIsNullOrWhiteSpace([AssertionConditionAttribute(AssertionConditionType.IS_NOT_NULL)] string value)
        {
            return StringNotIsNullOrWhiteSpace(value, "Result string should not be null or empty");
        }

        /// <exclude />
        [AssertionMethod]
        [StringFormatMethod("errorMessageOnNull")]
        public static string StringNotIsNullOrWhiteSpace([AssertionConditionAttribute(AssertionConditionType.IS_NOT_NULL)] string value, string errorMessageOnNull, params object[] formattingArgs)
        {
            if (String.IsNullOrWhiteSpace(value)) ThrowInvalidOperationException(errorMessageOnNull.FormatWith(formattingArgs));
            return value;
        }

        #endregion Exception throwing
    }
}

#region JetBrains Annotations

namespace JetBrains.Annotations
{
    /// <summary>
    /// Indicates that marked element should be localized or not.
    /// </summary>
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false, Inherited = true)]
    internal sealed class LocalizationRequiredAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LocalizationRequiredAttribute"/> class.
        /// </summary>
        /// <param name="required"><c>true</c> if a element should be localized; otherwise, <c>false</c>.</param>
        public LocalizationRequiredAttribute(bool required)
        {
            Required = required;
        }

        /// <summary>
        /// Gets a value indicating whether a element should be localized.
        /// <value><c>true</c> if a element should be localized; otherwise, <c>false</c>.</value>
        /// </summary>
        public bool Required { get; set; }

        /// <summary>
        /// Returns whether the value of the given object is equal to the current <see cref="LocalizationRequiredAttribute"/>.
        /// </summary>
        /// <param name="obj">The object to test the value equality of. </param>
        /// <returns>
        /// <c>true</c> if the value of the given object is equal to that of the current; otherwise, <c>false</c>.
        /// </returns>
        public override bool Equals(object obj)
        {
            var attribute = obj as LocalizationRequiredAttribute;
            return attribute != null && attribute.Required == Required;
        }

        /// <summary>
        /// Returns the hash code for this instance.
        /// </summary>
        /// <returns>A hash code for the current <see cref="LocalizationRequiredAttribute"/>.</returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    /// <summary>
    /// Indicates that marked method builds string by format pattern and (optional) arguments. 
    /// Parameter, which contains format string, should be given in constructor.
    /// The format string should be in <see cref="string.Format(IFormatProvider,string,object[])"/> -like form
    /// </summary>
    [AttributeUsage(AttributeTargets.Constructor | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    internal sealed class StringFormatMethodAttribute : Attribute
    {
        private readonly string myFormatParameterName;

        /// <summary>
        /// Initializes new instance of StringFormatMethodAttribute
        /// </summary>
        /// <param name="formatParameterName">Specifies which parameter of an annotated method should be treated as format-string</param>
        public StringFormatMethodAttribute(string formatParameterName)
        {
            myFormatParameterName = formatParameterName;
        }

        /// <summary>
        /// Gets format parameter name
        /// </summary>
        public string FormatParameterName
        {
            get { return myFormatParameterName; }
        }
    }

    /// <summary>
    /// Indicates that the function argument should be string literal and match one  of the parameters of the caller function.
    /// For example, <see cref="ArgumentNullException"/> has such parameter.
    /// </summary>
    [AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false, Inherited = true)]
    internal sealed class InvokerParameterNameAttribute : Attribute
    {
    }

    /// <summary>
    /// Indicates that the marked method is assertion method, i.e. it halts control flow if one of the conditions is satisfied. 
    /// To set the condition, mark one of the parameters with <see cref="AssertionConditionAttribute"/> attribute
    /// </summary>
    /// <seealso cref="AssertionConditionAttribute"/>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    internal sealed class AssertionMethodAttribute : Attribute
    {
    }

    /// <summary>
    /// Indicates the condition parameter of the assertion method. 
    /// The method itself should be marked by <see cref="AssertionMethodAttribute"/> attribute.
    /// The mandatory argument of the attribute is the assertion type.
    /// </summary>
    /// <seealso cref="AssertionConditionType"/>
    [AttributeUsage(AttributeTargets.Parameter, AllowMultiple = false, Inherited = true)]
    internal sealed class AssertionConditionAttribute : Attribute
    {
        private readonly AssertionConditionType myConditionType;

        /// <summary>
        /// Initializes new instance of AssertionConditionAttribute
        /// </summary>
        /// <param name="conditionType">Specifies condition type</param>
        public AssertionConditionAttribute(AssertionConditionType conditionType)
        {
            myConditionType = conditionType;
        }

        /// <summary>
        /// Gets condition type
        /// </summary>
        public AssertionConditionType ConditionType
        {
            get { return myConditionType; }
        }
    }

    /// <summary>
    /// Specifies assertion type. If the assertion method argument satisifes the condition, then the execution continues. 
    /// Otherwise, execution is assumed to be halted
    /// </summary>
    internal enum AssertionConditionType
    {
        /// <summary>
        /// Indicates that the marked parameter should be evaluated to true
        /// </summary>
        IS_TRUE = 0,

        /// <summary>
        /// Indicates that the marked parameter should be evaluated to false
        /// </summary>
        IS_FALSE = 1,

        /// <summary>
        /// Indicates that the marked parameter should be evaluated to null value
        /// </summary>
        IS_NULL = 2,

        /// <summary>
        /// Indicates that the marked parameter should be evaluated to not null value
        /// </summary>
        IS_NOT_NULL = 3,
    }

    /// <summary>
    /// Indicates that the marked method unconditionally terminates control flow execution.
    /// For example, it could unconditionally throw exception
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    internal sealed class TerminatesProgramAttribute : Attribute
    {
    }

    /// <summary>
    /// Indicates that the value of marked element could be <c>null</c> sometimes, so the check for <c>null</c> is necessary before its usage
    /// </summary>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Parameter | AttributeTargets.Property | AttributeTargets.Delegate | AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    internal sealed class CanBeNullAttribute : Attribute
    {
    }

    /// <summary>
    /// Indicates that the value of marked element could never be <c>null</c>
    /// </summary>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Parameter | AttributeTargets.Property | AttributeTargets.Delegate | AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    internal sealed class NotNullAttribute : Attribute
    {
    }

    /// <summary>
    /// Indicates that the value of marked type (or its derivatives) cannot be compared using '==' or '!=' operators.
    /// There is only exception to compare with <c>null</c>, it is permitted
    /// </summary>
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class | AttributeTargets.Struct, AllowMultiple = false, Inherited = true)]
    internal sealed class CannotApplyEqualityOperatorAttribute : Attribute
    {
    }

    /// <summary>
    /// When applied to target attribute, specifies a requirement for any type which is marked with 
    /// target attribute to implement or inherit specific type or types
    /// </summary>
    /// <example>
    /// <code>
    /// [BaseTypeRequired(typeof(IComponent)] // Specify requirement
    /// public class ComponentAttribute : Attribute 
    /// {}
    /// 
    /// [Component] // ComponentAttribute requires implementing IComponent interface
    /// public class MyComponent : IComponent
    /// {}
    /// </code>
    /// </example>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    [BaseTypeRequired(typeof(Attribute))]
    internal sealed class BaseTypeRequiredAttribute : Attribute
    {
        private readonly Type[] myBaseTypes;

        /// <summary>
        /// Initializes new instance of BaseTypeRequiredAttribute
        /// </summary>
        /// <param name="baseType">Specifies which types are required</param>
        public BaseTypeRequiredAttribute(Type baseType)
        {
            myBaseTypes = new[] { baseType };
        }

        /// <summary>
        /// Gets enumerations of specified base types
        /// </summary>
        public IEnumerable<Type> BaseTypes
        {
            get { return myBaseTypes; }
        }
    }

    /// <summary>
    /// Indicates that the marked symbol is used implicitly (e.g. via reflection, in external library),
    /// so this symbol will not be marked as unused (as well as by other usage inspections)
    /// </summary>
    [AttributeUsage(AttributeTargets.All, AllowMultiple = false, Inherited = true)]
    internal sealed class UsedImplicitlyAttribute : Attribute
    {
        [UsedImplicitly]
        public UsedImplicitlyAttribute()
            : this(ImplicitUseKindFlags.Default, ImplicitUseTargetFlags.Default)
        {
        }

        [UsedImplicitly]
        public UsedImplicitlyAttribute(ImplicitUseKindFlags useKindFlags, ImplicitUseTargetFlags targetFlags)
        {
            UseKindFlags = useKindFlags;
            TargetFlags = targetFlags;
        }

        [UsedImplicitly]
        public UsedImplicitlyAttribute(ImplicitUseKindFlags useKindFlags)
            : this(useKindFlags, ImplicitUseTargetFlags.Default)
        {
        }

        [UsedImplicitly]
        public UsedImplicitlyAttribute(ImplicitUseTargetFlags targetFlags)
            : this(ImplicitUseKindFlags.Default, targetFlags)
        {
        }

        [UsedImplicitly]
        public ImplicitUseKindFlags UseKindFlags { get; private set; }

        /// <summary>
        /// Gets value indicating what is meant to be used
        /// </summary>
        [UsedImplicitly]
        public ImplicitUseTargetFlags TargetFlags { get; private set; }
    }

    /// <summary>
    /// Should be used on attributes and causes ReSharper to not mark symbols marked with such attributes as unused (as well as by other usage inspections)
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    internal sealed class MeansImplicitUseAttribute : Attribute
    {
        [UsedImplicitly]
        public MeansImplicitUseAttribute()
            : this(ImplicitUseKindFlags.Default, ImplicitUseTargetFlags.Default)
        {
        }

        [UsedImplicitly]
        public MeansImplicitUseAttribute(ImplicitUseKindFlags useKindFlags, ImplicitUseTargetFlags targetFlags)
        {
            UseKindFlags = useKindFlags;
            TargetFlags = targetFlags;
        }

        [UsedImplicitly]
        public MeansImplicitUseAttribute(ImplicitUseKindFlags useKindFlags)
            : this(useKindFlags, ImplicitUseTargetFlags.Default)
        {
        }

        [UsedImplicitly]
        public MeansImplicitUseAttribute(ImplicitUseTargetFlags targetFlags)
            : this(ImplicitUseKindFlags.Default, targetFlags)
        {
        }

        [UsedImplicitly]
        public ImplicitUseKindFlags UseKindFlags { get; private set; }

        /// <summary>
        /// Gets value indicating what is meant to be used
        /// </summary>
        [UsedImplicitly]
        public ImplicitUseTargetFlags TargetFlags { get; private set; }
    }

    [Flags]
    internal enum ImplicitUseKindFlags
    {
        Default = Access | Assign | InstantiatedWithFixedConstructorSignature,

        /// <summary>
        /// Only entity marked with attribute considered used
        /// </summary>
        Access = 1,

        /// <summary>
        /// Indicates implicit assignment to a member
        /// </summary>
        Assign = 2,

        /// <summary>
        /// Indicates implicit instantiation of a type with fixed constructor signature.
        /// That means any unused constructor parameters won't be reported as such.
        /// </summary>
        InstantiatedWithFixedConstructorSignature = 4,

        /// <summary>
        /// Indicates implicit instantiation of a type
        /// </summary>
        InstantiatedNoFixedConstructorSignature = 8,
    }

    /// <summary>
    /// Specify what is considered used implicitly when marked with <see cref="MeansImplicitUseAttribute"/> or <see cref="UsedImplicitlyAttribute"/>
    /// </summary>
    [Flags]
    internal enum ImplicitUseTargetFlags
    {
        Default = Itself,

        Itself = 1,

        /// <summary>
        /// Members of entity marked with attribute are considered used
        /// </summary>
        Members = 2,

        /// <summary>
        /// Entity marked with attribute and all its members considered used
        /// </summary>
        WithMembers = Itself | Members
    }

    /// <summary>
    /// This attribute is intended to mark publicly available API which should not be removed and so is treated as used.
    /// </summary>
    [MeansImplicitUse]
    internal sealed class PublicAPIAttribute : Attribute
    {
        public PublicAPIAttribute()
        {
        }

        // ReSharper disable UnusedParameter.Local
        public PublicAPIAttribute(string comment)
        // ReSharper restore UnusedParameter.Local
        {
        }
    }

    /// <summary>
    /// Tells code analysis engine if the parameter is completely handled when the invoked method is on stack. 
    /// If the parameter is delegate, indicates that delegate is executed while the method is executed.
    /// If the parameter is enumerable, indicates that it is enumerated while the method is executed.
    /// </summary>
    [AttributeUsage(AttributeTargets.Parameter, Inherited = true)]
    internal sealed class InstantHandleAttribute : Attribute
    {
    }

    /// <summary>
    /// Indicates that method doesn't contain observable side effects.
    /// The same as <see cref="System.Diagnostics.Contracts.PureAttribute"/>
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = true)]
    internal sealed class PureAttribute : Attribute { }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    internal class PathReferenceAttribute : System.Attribute
    {
        public PathReferenceAttribute() { }

        public PathReferenceAttribute([PathReference] string basePath)
        {
            BasePath = basePath;
        }

        public string BasePath { get; private set; }
    }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    internal sealed class AspMvcModelTypeAttribute : System.Attribute { }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter | System.AttributeTargets.Method)]
    internal sealed class AspMvcControllerAttribute : System.Attribute
    {
        public string AnonymousProperty { get; private set; }

        public AspMvcControllerAttribute() { }

        public AspMvcControllerAttribute(string anonymousProperty)
        {
            AnonymousProperty = anonymousProperty;
        }
    }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    internal sealed class AspMvcMasterAttribute : System.Attribute
    {
    }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter | System.AttributeTargets.Method)]
    internal sealed class AspMvcViewAttribute : PathReferenceAttribute
    {
    }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    internal sealed class AspMvcAreaAttribute : PathReferenceAttribute
    {
        public string AnonymousProperty { get; private set; }

        public AspMvcAreaAttribute() { }

        public AspMvcAreaAttribute(string anonymousProperty)
        {
            AnonymousProperty = anonymousProperty;
        }
    }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter | System.AttributeTargets.Method)]
    internal sealed class AspMvcActionAttribute : System.Attribute
    {
        public string AnonymousProperty { get; private set; }

        public AspMvcActionAttribute() { }

        public AspMvcActionAttribute(string anonymousProperty)
        {
            AnonymousProperty = anonymousProperty;
        }
    }
}
namespace JetBrains.Annotations
{
    [System.AttributeUsage(System.AttributeTargets.Parameter)]
    internal sealed class AspMvcTemplateAttribute : System.Attribute
    {
    }
}

#endregion JetBrains Annotations