using System.Resources;
using System.Globalization;
using System.Threading;


namespace Composite.Linq.Disassembled
{
    public sealed class SR
    {
        // Fields
        public const string ArgumentMemberNotDeclOnType = "ArgumentMemberNotDeclOnType";
        public const string ArgumentMustBeArray = "ArgumentMustBeArray";
        public const string ArgumentMustBeArrayIndexType = "ArgumentMustBeArrayIndexType";
        public const string ArgumentMustBeBoolean = "ArgumentMustBeBoolean";
        public const string ArgumentMustBeCheckable = "ArgumentMustBeCheckable";
        public const string ArgumentMustBeComparable = "ArgumentMustBeComparable";
        public const string ArgumentMustBeConvertible = "ArgumentMustBeConvertible";
        public const string ArgumentMustBeFieldInfoOrPropertInfo = "ArgumentMustBeFieldInfoOrPropertInfo";
        public const string ArgumentMustBeFieldInfoOrPropertInfoOrMethod = "ArgumentMustBeFieldInfoOrPropertInfoOrMethod";
        public const string ArgumentMustBeInstanceMember = "ArgumentMustBeInstanceMember";
        public const string ArgumentMustBeInt32 = "ArgumentMustBeInt32";
        public const string ArgumentMustBeInteger = "ArgumentMustBeInteger";
        public const string ArgumentMustBeIntegerOrBoolean = "ArgumentMustBeIntegerOrBoolean";
        public const string ArgumentMustBeNumeric = "ArgumentMustBeNumeric";
        public const string ArgumentTypeDoesNotMatchMember = "ArgumentTypeDoesNotMatchMember";
        public const string ArgumentTypesMustMatch = "ArgumentTypesMustMatch";
        public const string BinaryOperatorNotDefined = "BinaryOperatorNotDefined";
        public const string CannotAutoInitializeValueTypeElementThroughProperty = "CannotAutoInitializeValueTypeElementThroughProperty";
        public const string CannotAutoInitializeValueTypeMemberThroughProperty = "CannotAutoInitializeValueTypeMemberThroughProperty";
        public const string CannotCastTypeToType = "CannotCastTypeToType";
        public const string CoalesceUsedOnNonNullType = "CoalesceUsedOnNonNullType";
        public const string CoercionOperatorNotDefined = "CoercionOperatorNotDefined";
        public const string ElementInitializerMethodNoRefOutParam = "ElementInitializerMethodNoRefOutParam";
        public const string ElementInitializerMethodNotAdd = "ElementInitializerMethodNotAdd";
        public const string ElementInitializerMethodStatic = "ElementInitializerMethodStatic";
        public const string ElementInitializerMethodWithZeroArgs = "ElementInitializerMethodWithZeroArgs";
        public const string ExpressionMayNotContainByrefParameters = "ExpressionMayNotContainByrefParameters";
        public const string ExpressionTypeCannotInitializeArrayType = "ExpressionTypeCannotInitializeArrayType";
        public const string ExpressionTypeCannotInitializeCollectionType = "ExpressionTypeCannotInitializeCollectionType";
        public const string ExpressionTypeDoesNotMatchArrayType = "ExpressionTypeDoesNotMatchArrayType";
        public const string ExpressionTypeDoesNotMatchConstructorParameter = "ExpressionTypeDoesNotMatchConstructorParameter";
        public const string ExpressionTypeDoesNotMatchMethodParameter = "ExpressionTypeDoesNotMatchMethodParameter";
        public const string ExpressionTypeDoesNotMatchParameter = "ExpressionTypeDoesNotMatchParameter";
        public const string ExpressionTypeDoesNotMatchReturn = "ExpressionTypeDoesNotMatchReturn";
        public const string ExpressionTypeNotInvocable = "ExpressionTypeNotInvocable";
        public const string FieldNotDefinedForType = "FieldNotDefinedForType";
        public const string IncorrectNumberOfArgumentsForMembers = "IncorrectNumberOfArgumentsForMembers";
        public const string IncorrectNumberOfConstructorArguments = "IncorrectNumberOfConstructorArguments";
        public const string IncorrectNumberOfIndexes = "IncorrectNumberOfIndexes";
        public const string IncorrectNumberOfLambdaArguments = "IncorrectNumberOfLambdaArguments";
        public const string IncorrectNumberOfLambdaDeclarationParameters = "IncorrectNumberOfLambdaDeclarationParameters";
        public const string IncorrectNumberOfMembersForGivenConstructor = "IncorrectNumberOfMembersForGivenConstructor";
        public const string IncorrectNumberOfMethodCallArguments = "IncorrectNumberOfMethodCallArguments";
        public const string IncorrectNumberOfTypeArgsForAction = "IncorrectNumberOfTypeArgsForAction";
        public const string IncorrectNumberOfTypeArgsForFunc = "IncorrectNumberOfTypeArgsForFunc";
        public const string IncorrectTypeForTypeAs = "IncorrectTypeForTypeAs";
        public const string InvalidCast = "InvalidCast";
        public const string LambdaParameterNotInScope = "LambdaParameterNotInScope";
        public const string LambdaTypeMustBeDerivedFromSystemDelegate = "LambdaTypeMustBeDerivedFromSystemDelegate";
        public const string ListInitializerWithZeroMembers = "ListInitializerWithZeroMembers";
        private static SR loader;
        public const string LogicalOperatorMustHaveBooleanOperators = "LogicalOperatorMustHaveBooleanOperators";
        public const string LogicalOperatorMustHaveConsistentTypes = "LogicalOperatorMustHaveConsistentTypes";
        public const string MemberNotFieldOrProperty = "MemberNotFieldOrProperty";
        public const string MethodContainsGenericParameters = "MethodContainsGenericParameters";
        public const string MethodDoesNotExistOnType = "MethodDoesNotExistOnType";
        public const string MethodIsGeneric = "MethodIsGeneric";
        public const string MethodNotDefinedForType = "MethodNotDefinedForType";
        public const string MethodNotPropertyAccessor = "MethodNotPropertyAccessor";
        public const string MethodWithArgsDoesNotExistOnType = "MethodWithArgsDoesNotExistOnType";
        public const string MethodWithMoreThanOneMatch = "MethodWithMoreThanOneMatch";
        public const string NotAGenericMethod = "NotAGenericMethod";
        public const string NotAMemberOfType = "NotAMemberOfType";
        public const string OperandTypesDoNotMatchParameters = "OperandTypesDoNotMatchParameters";
        public const string OperatorNotImplementedForType = "OperatorNotImplementedForType";
        public const string OwningTeam = "OwningTeam";
        public const string ParameterExpressionNotValidAsDelegate = "ParameterExpressionNotValidAsDelegate";
        public const string ParameterNotCaptured = "ParameterNotCaptured";
        public const string PropertyDoesNotHaveGetter = "PropertyDoesNotHaveGetter";
        public const string PropertyDoesNotHaveSetter = "PropertyDoesNotHaveSetter";
        public const string PropertyNotDefinedForType = "PropertyNotDefinedForType";
        private ResourceManager resources;
        private static object s_InternalSyncObject;
        public const string TypeContainsGenericParameters = "TypeContainsGenericParameters";
        public const string TypeIsGeneric = "TypeIsGeneric";
        public const string TypeMissingDefaultConstructor = "TypeMissingDefaultConstructor";
        public const string TypeNotIEnumerable = "TypeNotIEnumerable";
        public const string TypeParameterIsNotDelegate = "TypeParameterIsNotDelegate";
        public const string UnaryOperatorNotDefined = "UnaryOperatorNotDefined";
        public const string UnexpectedCoalesceOperator = "UnexpectedCoalesceOperator";
        public const string UnhandledBinary = "UnhandledBinary";
        public const string UnhandledBinding = "UnhandledBinding";
        public const string UnhandledBindingType = "UnhandledBindingType";
        public const string UnhandledCall = "UnhandledCall";
        public const string UnhandledConvert = "UnhandledConvert";
        public const string UnhandledConvertFromDecimal = "UnhandledConvertFromDecimal";
        public const string UnhandledConvertToDecimal = "UnhandledConvertToDecimal";
        public const string UnhandledExpressionType = "UnhandledExpressionType";
        public const string UnhandledLiftedBinary = "UnhandledLiftedBinary";
        public const string UnhandledMemberAccess = "UnhandledMemberAccess";
        public const string UnhandledUnary = "UnhandledUnary";
        public const string UnknownBindingType = "UnknownBindingType";
        public const string UnknownLiftType = "UnknownLiftType";
        public const string UserDefinedOperatorMustBeStatic = "UserDefinedOperatorMustBeStatic";
        public const string UserDefinedOperatorMustNotBeVoid = "UserDefinedOperatorMustNotBeVoid";

        // Methods
        internal SR()
        {
            this.resources = new ResourceManager("System.Linq.Expressions", base.GetType().Assembly);
        }

        private static SR GetLoader()
        {
            if (loader == null)
            {
                lock (InternalSyncObject)
                {
                    if (loader == null)
                    {
                        loader = new SR();
                    }
                }
            }
            return loader;
        }

        public static object GetObject(string name)
        {
            SR loader = GetLoader();
            if (loader == null)
            {
                return null;
            }
            return loader.resources.GetObject(name, Culture);
        }

        public static string GetString(string name)
        {
            SR loader = GetLoader();
            if (loader == null)
            {
                return null;
            }
            return loader.resources.GetString(name, Culture);
        }

        public static string GetString(string name, params object[] args)
        {
            SR loader = GetLoader();
            if (loader == null)
            {
                return null;
            }
            string format = loader.resources.GetString(name, Culture);
            if ((args == null) || (args.Length <= 0))
            {
                return format;
            }
            for (int i = 0; i < args.Length; i++)
            {
                string text2 = args[i] as string;
                if ((text2 != null) && (text2.Length > 0x400))
                {
                    args[i] = text2.Substring(0, 0x3fd) + "...";
                }
            }
            return string.Format(CultureInfo.CurrentCulture, format, args);
        }

        // Properties
        private static CultureInfo Culture
        {
            get
            {
                return null;
            }
        }

        private static object InternalSyncObject
        {
            get
            {
                if (s_InternalSyncObject == null)
                {
                    object obj2 = new object();
                    Interlocked.CompareExchange(ref s_InternalSyncObject, obj2, null);
                }
                return s_InternalSyncObject;
            }
        }

        public static ResourceManager Resources
        {
            get
            {
                return GetLoader().resources;
            }
        }

    }


}
