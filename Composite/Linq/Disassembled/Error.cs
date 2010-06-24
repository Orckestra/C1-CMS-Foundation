using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Linq.Disassembled
{
    public static class Error
    {
        // Methods
        public static Exception ArgumentMemberNotDeclOnType(object p0, object p1)
        {
            return new ArgumentException(Strings.ArgumentMemberNotDeclOnType(p0, p1));
        }

        public static Exception ArgumentMustBeArray()
        {
            return new ArgumentException(Strings.ArgumentMustBeArray);
        }

        public static Exception ArgumentMustBeArrayIndexType()
        {
            return new ArgumentException(Strings.ArgumentMustBeArrayIndexType);
        }

        public static Exception ArgumentMustBeBoolean()
        {
            return new ArgumentException(Strings.ArgumentMustBeBoolean);
        }

        public static Exception ArgumentMustBeCheckable()
        {
            return new ArgumentException(Strings.ArgumentMustBeCheckable);
        }

        public static Exception ArgumentMustBeComparable()
        {
            return new ArgumentException(Strings.ArgumentMustBeComparable);
        }

        public static Exception ArgumentMustBeConvertible()
        {
            return new ArgumentException(Strings.ArgumentMustBeConvertible);
        }

        public static Exception ArgumentMustBeFieldInfoOrPropertInfo()
        {
            return new ArgumentException(Strings.ArgumentMustBeFieldInfoOrPropertInfo);
        }

        public static Exception ArgumentMustBeFieldInfoOrPropertInfoOrMethod()
        {
            return new ArgumentException(Strings.ArgumentMustBeFieldInfoOrPropertInfoOrMethod);
        }

        public static Exception ArgumentMustBeInstanceMember()
        {
            return new ArgumentException(Strings.ArgumentMustBeInstanceMember);
        }

        public static Exception ArgumentMustBeInt32()
        {
            return new ArgumentException(Strings.ArgumentMustBeInt32);
        }

        public static Exception ArgumentMustBeInteger()
        {
            return new ArgumentException(Strings.ArgumentMustBeInteger);
        }

        public static Exception ArgumentMustBeIntegerOrBoolean()
        {
            return new ArgumentException(Strings.ArgumentMustBeIntegerOrBoolean);
        }

        public static Exception ArgumentMustBeNumeric()
        {
            return new ArgumentException(Strings.ArgumentMustBeNumeric);
        }

        public static Exception ArgumentNull(string paramName)
        {
            return new ArgumentNullException(paramName);
        }

        public static Exception ArgumentOutOfRange(string paramName)
        {
            return new ArgumentOutOfRangeException(paramName);
        }

        public static Exception ArgumentTypeDoesNotMatchMember(object p0, object p1)
        {
            return new ArgumentException(Strings.ArgumentTypeDoesNotMatchMember(p0, p1));
        }

        public static Exception ArgumentTypesMustMatch()
        {
            return new ArgumentException(Strings.ArgumentTypesMustMatch);
        }

        public static Exception BinaryOperatorNotDefined(object p0, object p1, object p2)
        {
            return new InvalidOperationException(Strings.BinaryOperatorNotDefined(p0, p1, p2));
        }

        public static Exception CannotAutoInitializeValueTypeElementThroughProperty(object p0)
        {
            return new InvalidOperationException(Strings.CannotAutoInitializeValueTypeElementThroughProperty(p0));
        }

        public static Exception CannotAutoInitializeValueTypeMemberThroughProperty(object p0)
        {
            return new InvalidOperationException(Strings.CannotAutoInitializeValueTypeMemberThroughProperty(p0));
        }

        public static Exception CannotCastTypeToType(object p0, object p1)
        {
            return new ArgumentException(Strings.CannotCastTypeToType(p0, p1));
        }

        public static Exception CoalesceUsedOnNonNullType()
        {
            return new InvalidOperationException(Strings.CoalesceUsedOnNonNullType);
        }

        public static Exception CoercionOperatorNotDefined(object p0, object p1)
        {
            return new InvalidOperationException(Strings.CoercionOperatorNotDefined(p0, p1));
        }

        public static Exception ElementInitializerMethodNoRefOutParam(object p0, object p1)
        {
            return new ArgumentException(Strings.ElementInitializerMethodNoRefOutParam(p0, p1));
        }

        public static Exception ElementInitializerMethodNotAdd()
        {
            return new ArgumentException(Strings.ElementInitializerMethodNotAdd);
        }

        public static Exception ElementInitializerMethodStatic()
        {
            return new ArgumentException(Strings.ElementInitializerMethodStatic);
        }

        public static Exception ElementInitializerMethodWithZeroArgs()
        {
            return new ArgumentException(Strings.ElementInitializerMethodWithZeroArgs);
        }

        public static Exception ExpressionMayNotContainByrefParameters()
        {
            return new ArgumentException(Strings.ExpressionMayNotContainByrefParameters);
        }

        public static Exception ExpressionTypeCannotInitializeArrayType(object p0, object p1)
        {
            return new InvalidOperationException(Strings.ExpressionTypeCannotInitializeArrayType(p0, p1));
        }

        public static Exception ExpressionTypeCannotInitializeCollectionType(object p0, object p1)
        {
            return new InvalidOperationException(Strings.ExpressionTypeCannotInitializeCollectionType(p0, p1));
        }

        public static Exception ExpressionTypeDoesNotMatchArrayType(object p0, object p1)
        {
            return new InvalidOperationException(Strings.ExpressionTypeDoesNotMatchArrayType(p0, p1));
        }

        public static Exception ExpressionTypeDoesNotMatchConstructorParameter(object p0, object p1)
        {
            return new ArgumentException(Strings.ExpressionTypeDoesNotMatchConstructorParameter(p0, p1));
        }

        public static Exception ExpressionTypeDoesNotMatchMethodParameter(object p0, object p1, object p2)
        {
            return new ArgumentException(Strings.ExpressionTypeDoesNotMatchMethodParameter(p0, p1, p2));
        }

        public static Exception ExpressionTypeDoesNotMatchParameter(object p0, object p1)
        {
            return new ArgumentException(Strings.ExpressionTypeDoesNotMatchParameter(p0, p1));
        }

        public static Exception ExpressionTypeDoesNotMatchReturn(object p0, object p1)
        {
            return new ArgumentException(Strings.ExpressionTypeDoesNotMatchReturn(p0, p1));
        }

        public static Exception ExpressionTypeNotInvocable(object p0)
        {
            return new ArgumentException(Strings.ExpressionTypeNotInvocable(p0));
        }

        public static Exception FieldNotDefinedForType(object p0, object p1)
        {
            return new ArgumentException(Strings.FieldNotDefinedForType(p0, p1));
        }

        public static Exception IncorrectNumberOfArgumentsForMembers()
        {
            return new ArgumentException(Strings.IncorrectNumberOfArgumentsForMembers);
        }

        public static Exception IncorrectNumberOfConstructorArguments()
        {
            return new ArgumentException(Strings.IncorrectNumberOfConstructorArguments);
        }

        public static Exception IncorrectNumberOfIndexes()
        {
            return new ArgumentException(Strings.IncorrectNumberOfIndexes);
        }

        public static Exception IncorrectNumberOfLambdaArguments()
        {
            return new InvalidOperationException(Strings.IncorrectNumberOfLambdaArguments);
        }

        public static Exception IncorrectNumberOfLambdaDeclarationParameters()
        {
            return new ArgumentException(Strings.IncorrectNumberOfLambdaDeclarationParameters);
        }

        public static Exception IncorrectNumberOfMembersForGivenConstructor()
        {
            return new ArgumentException(Strings.IncorrectNumberOfMembersForGivenConstructor);
        }

        public static Exception IncorrectNumberOfMethodCallArguments(object p0)
        {
            return new ArgumentException(Strings.IncorrectNumberOfMethodCallArguments(p0));
        }

        public static Exception IncorrectNumberOfTypeArgsForAction()
        {
            return new ArgumentException(Strings.IncorrectNumberOfTypeArgsForAction);
        }

        public static Exception IncorrectNumberOfTypeArgsForFunc()
        {
            return new ArgumentException(Strings.IncorrectNumberOfTypeArgsForFunc);
        }

        public static Exception IncorrectTypeForTypeAs(object p0)
        {
            return new ArgumentException(Strings.IncorrectTypeForTypeAs(p0));
        }

        public static Exception InvalidCast(object p0, object p1)
        {
            return new InvalidOperationException(Strings.InvalidCast(p0, p1));
        }

        public static Exception LambdaParameterNotInScope()
        {
            return new InvalidOperationException(Strings.LambdaParameterNotInScope);
        }

        public static Exception LambdaTypeMustBeDerivedFromSystemDelegate()
        {
            return new ArgumentException(Strings.LambdaTypeMustBeDerivedFromSystemDelegate);
        }

        public static Exception ListInitializerWithZeroMembers()
        {
            return new ArgumentException(Strings.ListInitializerWithZeroMembers);
        }

        public static Exception LogicalOperatorMustHaveBooleanOperators(object p0, object p1)
        {
            return new ArgumentException(Strings.LogicalOperatorMustHaveBooleanOperators(p0, p1));
        }

        public static Exception LogicalOperatorMustHaveConsistentTypes(object p0, object p1)
        {
            return new ArgumentException(Strings.LogicalOperatorMustHaveConsistentTypes(p0, p1));
        }

        public static Exception MemberNotFieldOrProperty(object p0)
        {
            return new ArgumentException(Strings.MemberNotFieldOrProperty(p0));
        }

        public static Exception MethodContainsGenericParameters(object p0)
        {
            return new ArgumentException(Strings.MethodContainsGenericParameters(p0));
        }

        public static Exception MethodDoesNotExistOnType(object p0, object p1)
        {
            return new InvalidOperationException(Strings.MethodDoesNotExistOnType(p0, p1));
        }

        public static Exception MethodIsGeneric(object p0)
        {
            return new ArgumentException(Strings.MethodIsGeneric(p0));
        }

        public static Exception MethodNotDefinedForType(object p0, object p1)
        {
            return new ArgumentException(Strings.MethodNotDefinedForType(p0, p1));
        }

        public static Exception MethodNotPropertyAccessor(object p0, object p1)
        {
            return new ArgumentException(Strings.MethodNotPropertyAccessor(p0, p1));
        }

        public static Exception MethodWithArgsDoesNotExistOnType(object p0, object p1)
        {
            return new InvalidOperationException(Strings.MethodWithArgsDoesNotExistOnType(p0, p1));
        }

        public static Exception MethodWithMoreThanOneMatch(object p0, object p1)
        {
            return new InvalidOperationException(Strings.MethodWithMoreThanOneMatch(p0, p1));
        }

        public static Exception NotAGenericMethod(object p0)
        {
            return new ArgumentException(Strings.NotAGenericMethod(p0));
        }

        public static Exception NotAMemberOfType(object p0, object p1)
        {
            return new ArgumentException(Strings.NotAMemberOfType(p0, p1));
        }

        public static Exception NotImplemented()
        {
            return new NotImplementedException();
        }

        public static Exception NotSupported()
        {
            return new NotSupportedException();
        }

        public static Exception OperandTypesDoNotMatchParameters(object p0, object p1)
        {
            return new InvalidOperationException(Strings.OperandTypesDoNotMatchParameters(p0, p1));
        }

        public static Exception OperatorNotImplementedForType(object p0, object p1)
        {
            return new NotImplementedException(Strings.OperatorNotImplementedForType(p0, p1));
        }

        public static Exception ParameterExpressionNotValidAsDelegate(object p0, object p1)
        {
            return new ArgumentException(Strings.ParameterExpressionNotValidAsDelegate(p0, p1));
        }

        public static Exception ParameterNotCaptured()
        {
            return new ArgumentException(Strings.ParameterNotCaptured);
        }

        public static Exception PropertyDoesNotHaveGetter(object p0)
        {
            return new ArgumentException(Strings.PropertyDoesNotHaveGetter(p0));
        }

        public static Exception PropertyDoesNotHaveSetter(object p0)
        {
            return new ArgumentException(Strings.PropertyDoesNotHaveSetter(p0));
        }

        public static Exception PropertyNotDefinedForType(object p0, object p1)
        {
            return new ArgumentException(Strings.PropertyNotDefinedForType(p0, p1));
        }

        public static Exception TypeContainsGenericParameters(object p0)
        {
            return new ArgumentException(Strings.TypeContainsGenericParameters(p0));
        }

        public static Exception TypeIsGeneric(object p0)
        {
            return new ArgumentException(Strings.TypeIsGeneric(p0));
        }

        public static Exception TypeMissingDefaultConstructor(object p0)
        {
            return new ArgumentException(Strings.TypeMissingDefaultConstructor(p0));
        }

        public static Exception TypeNotIEnumerable(object p0)
        {
            return new ArgumentException(Strings.TypeNotIEnumerable(p0));
        }

        public static Exception TypeParameterIsNotDelegate(object p0)
        {
            return new InvalidOperationException(Strings.TypeParameterIsNotDelegate(p0));
        }

        public static Exception UnaryOperatorNotDefined(object p0, object p1)
        {
            return new InvalidOperationException(Strings.UnaryOperatorNotDefined(p0, p1));
        }

        public static Exception UnexpectedCoalesceOperator()
        {
            return new InvalidOperationException(Strings.UnexpectedCoalesceOperator);
        }

        public static Exception UnhandledBinary(object p0)
        {
            return new ArgumentException(Strings.UnhandledBinary(p0));
        }

        public static Exception UnhandledBinding()
        {
            return new ArgumentException(Strings.UnhandledBinding);
        }

        public static Exception UnhandledBindingType(object p0)
        {
            return new ArgumentException(Strings.UnhandledBindingType(p0));
        }

        public static Exception UnhandledCall(object p0)
        {
            return new ArgumentException(Strings.UnhandledCall(p0));
        }

        public static Exception UnhandledConvert(object p0)
        {
            return new ArgumentException(Strings.UnhandledConvert(p0));
        }

        public static Exception UnhandledConvertFromDecimal(object p0)
        {
            return new ArgumentException(Strings.UnhandledConvertFromDecimal(p0));
        }

        public static Exception UnhandledConvertToDecimal(object p0)
        {
            return new ArgumentException(Strings.UnhandledConvertToDecimal(p0));
        }

        public static Exception UnhandledExpressionType(object p0)
        {
            return new ArgumentException(Strings.UnhandledExpressionType(p0));
        }

        public static Exception UnhandledLiftedBinary(object p0)
        {
            return new ArgumentException(Strings.UnhandledLiftedBinary(p0));
        }

        public static Exception UnhandledMemberAccess(object p0)
        {
            return new ArgumentException(Strings.UnhandledMemberAccess(p0));
        }

        public static Exception UnhandledUnary(object p0)
        {
            return new ArgumentException(Strings.UnhandledUnary(p0));
        }

        public static Exception UnknownBindingType()
        {
            return new ArgumentException(Strings.UnknownBindingType);
        }

        public static Exception UnknownLiftType()
        {
            return new ArgumentException(Strings.UnknownLiftType);
        }

        public static Exception UserDefinedOperatorMustBeStatic(object p0)
        {
            return new ArgumentException(Strings.UserDefinedOperatorMustBeStatic(p0));
        }

        public static Exception UserDefinedOperatorMustNotBeVoid(object p0)
        {
            return new ArgumentException(Strings.UserDefinedOperatorMustNotBeVoid(p0));
        }
    }
}
