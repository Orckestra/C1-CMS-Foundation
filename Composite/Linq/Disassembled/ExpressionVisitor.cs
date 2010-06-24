using System;
using System.Linq;
using System.Reflection;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Composite.Data;


namespace Composite.Linq.Disassembled
{
    public abstract class ExpressionVisitor
    {
        public static BinaryExpression MakeBinaryExpression(ExpressionType eType, Expression left, Expression right)
        {
            switch (eType)
            {
                case ExpressionType.ArrayIndex:
                case ExpressionType.ArrayLength:
                case ExpressionType.Call:
                //case ExpressionType.CallVirtual:
                //case ExpressionType.Cast:                
                case ExpressionType.Conditional:
                case ExpressionType.Constant:
                case ExpressionType.Convert:
                case ExpressionType.ConvertChecked:
                    throw new ArgumentException("eType: " + eType);


                case ExpressionType.AddChecked:
                    return Expression.AddChecked(left, right);

                case ExpressionType.And:
                    return Expression.And(left, right);

                case ExpressionType.AndAlso:
                    return Expression.AndAlso(left, right);

                case ExpressionType.Coalesce:
                    return Expression.Coalesce(left, right);

                case ExpressionType.Divide:
                    return Expression.Divide(left, right);

                case ExpressionType.Equal:
                    return Expression.Equal(left, right);

                case ExpressionType.ExclusiveOr:
                    return Expression.ExclusiveOr(left, right);

                case ExpressionType.GreaterThan:
                    return Expression.GreaterThan(left, right);

                case ExpressionType.GreaterThanOrEqual:
                    return Expression.GreaterThanOrEqual(left, right);

                case ExpressionType.LeftShift:
                    return Expression.LeftShift(left, right);

                case ExpressionType.LessThan:
                    return Expression.LessThan(left, right);

                case ExpressionType.LessThanOrEqual:
                    return Expression.LessThanOrEqual(left, right);

                case ExpressionType.Modulo:
                    return Expression.Modulo(left, right);

                case ExpressionType.Multiply:
                    return Expression.Multiply(left, right);

                case ExpressionType.MultiplyChecked:
                    return Expression.MultiplyChecked(left, right);

                case ExpressionType.NotEqual:
                    return Expression.NotEqual(left, right);

                case ExpressionType.Or:
                    return Expression.Or(left, right);

                case ExpressionType.OrElse:
                    return Expression.OrElse(left, right);

                case ExpressionType.RightShift:
                    return Expression.RightShift(left, right);

                case ExpressionType.Subtract:
                    return Expression.Subtract(left, right);

                case ExpressionType.SubtractChecked:
                    return Expression.SubtractChecked(left, right);
            }
            return Expression.Add(left, right);
        }

        public static MemberExpression MakeMemberExpression(Expression expr, MemberInfo mi)
        {
            FieldInfo field = mi as FieldInfo;
            if (field != null)
            {
                return Expression.Field(expr, field);
            }
            PropertyInfo property = mi as PropertyInfo;
            if (property == null)
            {
                throw new Exception("Member is not a Field or Property: " + mi);
            }
            return Expression.Property(expr, property);
        }

        public static MethodCallExpression MakeMethodCallExpression(ExpressionType eType, Expression obj, MethodInfo method, IEnumerable<Expression> args)
        {
            return Expression.Call(obj, method, args);
        }


        public static UnaryExpression MakeUnaryExpression(ExpressionType eType, Expression operand, Type type)
        {
            switch (eType)
            {
                case ExpressionType.ArrayLength:
                    return Expression.ArrayLength(operand);

                //case ExpressionType.Cast:
                //    return Expression.Cast(operand, type);

                case ExpressionType.Convert:
                    return Expression.Convert(operand, type);

                case ExpressionType.ConvertChecked:
                    return Expression.ConvertChecked(operand, type);

                case ExpressionType.Negate:
                    return Expression.Negate(operand);

                case ExpressionType.NegateChecked:
                    return Expression.NegateChecked(operand);

                case ExpressionType.Not:
                    return Expression.Not(operand);

                case ExpressionType.Quote:
                    return Expression.Quote(operand);

                case ExpressionType.TypeAs:
                    return Expression.TypeAs(operand, type);
            }
            throw new ArgumentException("eType: " + eType);
        }

        // Methods
        public ExpressionVisitor()
        {
        }

        public virtual Expression Visit(Expression exp)
        {
            if (exp == null)
            {
                return exp;
            }
            switch (exp.NodeType)
            {
                case ExpressionType.Add:
                case ExpressionType.AddChecked:
                case ExpressionType.And:
                case ExpressionType.AndAlso:
                case ExpressionType.ArrayIndex:
                case ExpressionType.Coalesce:
                case ExpressionType.Divide:
                case ExpressionType.Equal:
                case ExpressionType.ExclusiveOr:
                case ExpressionType.GreaterThan:
                case ExpressionType.GreaterThanOrEqual:
                case ExpressionType.LeftShift:
                case ExpressionType.LessThan:
                case ExpressionType.LessThanOrEqual:
                case ExpressionType.Modulo:
                case ExpressionType.Multiply:
                case ExpressionType.MultiplyChecked:
                case ExpressionType.NotEqual:
                case ExpressionType.Or:
                case ExpressionType.OrElse:
                case ExpressionType.Power:
                case ExpressionType.RightShift:
                case ExpressionType.Subtract:
                case ExpressionType.SubtractChecked:
                    return this.VisitBinary((BinaryExpression)exp);

                case ExpressionType.ArrayLength:
                case ExpressionType.Convert:
                case ExpressionType.ConvertChecked:
                case ExpressionType.Negate:
                case ExpressionType.UnaryPlus:
                case ExpressionType.NegateChecked:
                case ExpressionType.Not:
                case ExpressionType.Quote:
                case ExpressionType.TypeAs:
                    return this.VisitUnary((UnaryExpression)exp);

                case ExpressionType.Call:
                    return this.VisitMethodCall((MethodCallExpression)exp);

                case ExpressionType.Conditional:
                    return this.VisitConditional((ConditionalExpression)exp);

                case ExpressionType.Constant:
                    return this.VisitConstant((ConstantExpression)exp);

                case ExpressionType.Invoke:
                    return this.VisitInvocation((InvocationExpression)exp);

                case ExpressionType.Lambda:
                    return this.VisitLambda((LambdaExpression)exp);

                case ExpressionType.ListInit:
                    return this.VisitListInit((ListInitExpression)exp);

                case ExpressionType.MemberAccess:
                    return this.VisitMemberAccess((MemberExpression)exp);

                case ExpressionType.MemberInit:
                    return this.VisitMemberInit((MemberInitExpression)exp);

                case ExpressionType.New:
                    return this.VisitNew((NewExpression)exp);

                case ExpressionType.NewArrayInit:
                case ExpressionType.NewArrayBounds:
                    return this.VisitNewArray((NewArrayExpression)exp);

                case ExpressionType.Parameter:
                    return this.VisitParameter((ParameterExpression)exp);

                case ExpressionType.TypeIs:
                    return this.VisitTypeIs((TypeBinaryExpression)exp);
            }
            throw Error.UnhandledExpressionType(exp.NodeType);
        }

        public virtual Expression VisitBinary(BinaryExpression b)
        {
            Expression left = this.Visit(b.Left);
            Expression right = this.Visit(b.Right);
            Expression expression3 = this.Visit(b.Conversion);
            if (((left == b.Left) && (right == b.Right)) && (expression3 == b.Conversion))
            {
                return b;
            }
            if ((b.NodeType == ExpressionType.Coalesce) && (b.Conversion != null))
            {
                return Expression.Coalesce(left, right, expression3 as LambdaExpression);
            }
            return Expression.MakeBinary(b.NodeType, left, right, b.IsLiftedToNull, b.Method);
        }

        public virtual MemberBinding VisitBinding(MemberBinding binding)
        {
            switch (binding.BindingType)
            {
                case MemberBindingType.Assignment:
                    return this.VisitMemberAssignment((MemberAssignment)binding);

                case MemberBindingType.MemberBinding:
                    return this.VisitMemberMemberBinding((MemberMemberBinding)binding);

                case MemberBindingType.ListBinding:
                    return this.VisitMemberListBinding((MemberListBinding)binding);
            }
            throw Error.UnhandledBindingType(binding.BindingType);
        }

        public virtual IEnumerable<MemberBinding> VisitBindingList(ReadOnlyCollection<MemberBinding> original)
        {
            List<MemberBinding> list = null;
            int num = 0;
            int capacity = original.Count;
            while (num < capacity)
            {
                MemberBinding item = this.VisitBinding(original[num]);
                if (list != null)
                {
                    list.Add(item);
                }
                else if (item != original[num])
                {
                    list = new List<MemberBinding>(capacity);
                    for (int i = 0; i < num; i++)
                    {
                        list.Add(original[i]);
                    }
                    list.Add(item);
                }
                num++;
            }
            if (list != null)
            {
                return list;
            }
            return original;
        }

        public virtual Expression VisitConditional(ConditionalExpression c)
        {
            Expression test = this.Visit(c.Test);
            Expression ifTrue = this.Visit(c.IfTrue);
            Expression ifFalse = this.Visit(c.IfFalse);
            if (((test == c.Test) && (ifTrue == c.IfTrue)) && (ifFalse == c.IfFalse))
            {
                return c;
            }
            return Expression.Condition(test, ifTrue, ifFalse);
        }

        public virtual Expression VisitConstant(ConstantExpression c)
        {
            return c;
        }

        public virtual ElementInit VisitElementInitializer(ElementInit initializer)
        {
            ReadOnlyCollection<Expression> arguments = this.VisitExpressionList(initializer.Arguments);
            if (arguments != initializer.Arguments)
            {
                return Expression.ElementInit(initializer.AddMethod, arguments);
            }
            return initializer;
        }

        public virtual IEnumerable<ElementInit> VisitElementInitializerList(ReadOnlyCollection<ElementInit> original)
        {
            List<ElementInit> list = null;
            int num = 0;
            int capacity = original.Count;
            while (num < capacity)
            {
                ElementInit item = this.VisitElementInitializer(original[num]);
                if (list != null)
                {
                    list.Add(item);
                }
                else if (item != original[num])
                {
                    list = new List<ElementInit>(capacity);
                    for (int i = 0; i < num; i++)
                    {
                        list.Add(original[i]);
                    }
                    list.Add(item);
                }
                num++;
            }
            if (list != null)
            {
                return list;
            }
            return original;
        }

        public virtual ReadOnlyCollection<Expression> VisitExpressionList(ReadOnlyCollection<Expression> original)
        {
            List<Expression> sequence = null;
            int num = 0;
            int capacity = original.Count;
            while (num < capacity)
            {
                Expression item = this.Visit(original[num]);
                if (sequence != null)
                {
                    sequence.Add(item);
                }
                else if (item != original[num])
                {
                    sequence = new List<Expression>(capacity);
                    for (int i = 0; i < num; i++)
                    {
                        sequence.Add(original[i]);
                    }
                    sequence.Add(item);
                }
                num++;
            }
            if (sequence != null)
            {
                return sequence.ToReadOnlyCollection<Expression>();
            }
            return original;
        }

        public virtual Expression VisitInvocation(InvocationExpression iv)
        {
            IEnumerable<Expression> arguments = this.VisitExpressionList(iv.Arguments);
            Expression expression = this.Visit(iv.Expression);
            if ((arguments == iv.Arguments) && (expression == iv.Expression))
            {
                return iv;
            }
            return Expression.Invoke(expression, arguments);
        }

        public virtual Expression VisitLambda(LambdaExpression lambda)
        {
            Expression body = this.Visit(lambda.Body);
            if (body != lambda.Body)
            {
                return Expression.Lambda(lambda.Type, body, lambda.Parameters);
            }
            return lambda;
        }

        public virtual Expression VisitListInit(ListInitExpression init)
        {
            NewExpression newExpression = this.VisitNew(init.NewExpression);
            IEnumerable<ElementInit> initializers = this.VisitElementInitializerList(init.Initializers);
            if ((newExpression == init.NewExpression) && (initializers == init.Initializers))
            {
                return init;
            }
            return Expression.ListInit(newExpression, initializers);
        }

        public virtual Expression VisitMemberAccess(MemberExpression m)
        {
            Expression expression = this.Visit(m.Expression);
            if (expression != m.Expression)
            {
                return Expression.MakeMemberAccess(expression, m.Member);
            }
            return m;
        }

        public virtual MemberAssignment VisitMemberAssignment(MemberAssignment assignment)
        {
            Expression expression = this.Visit(assignment.Expression);
            if (expression != assignment.Expression)
            {
                return Expression.Bind(assignment.Member, expression);
            }
            return assignment;
        }

        public virtual Expression VisitMemberInit(MemberInitExpression init)
        {
            NewExpression newExpression = this.VisitNew(init.NewExpression);
            IEnumerable<MemberBinding> bindings = this.VisitBindingList(init.Bindings);
            if ((newExpression == init.NewExpression) && (bindings == init.Bindings))
            {
                return init;
            }
            return Expression.MemberInit(newExpression, bindings);
        }

        public virtual MemberListBinding VisitMemberListBinding(MemberListBinding binding)
        {
            IEnumerable<ElementInit> initializers = this.VisitElementInitializerList(binding.Initializers);
            if (initializers != binding.Initializers)
            {
                return Expression.ListBind(binding.Member, initializers);
            }
            return binding;
        }

        public virtual MemberMemberBinding VisitMemberMemberBinding(MemberMemberBinding binding)
        {
            IEnumerable<MemberBinding> bindings = this.VisitBindingList(binding.Bindings);
            if (bindings != binding.Bindings)
            {
                return Expression.MemberBind(binding.Member, bindings);
            }
            return binding;
        }

        public virtual Expression VisitMethodCall(MethodCallExpression m)
        {
            Expression instance = this.Visit(m.Object);
            IEnumerable<Expression> arguments = this.VisitExpressionList(m.Arguments);
            if ((instance == m.Object) && (arguments == m.Arguments))
            {
                return m;
            }
            return Expression.Call(instance, m.Method, arguments);
        }

        public virtual NewExpression VisitNew(NewExpression nex)
        {
            IEnumerable<Expression> arguments = this.VisitExpressionList(nex.Arguments);
            if (arguments == nex.Arguments)
            {
                return nex;
            }

            // For "inner join"  support, converting queries like 
            //  (A, B) => new (a = A, B = b),   where A, B: IData or IEnumerable<... : IData>
            //  (New_A, New_B) => new (a = New_A, b = New_B),   where New_A, New_B - 'table' classes for interfaces A and B
            if(nex.Type.IsGenericType 
                && nex.Arguments.Count > 1
                && nex.Arguments.Any(argument => argument.Type.IsInterface && typeof(IData).IsAssignableFrom(argument.Type)
                       || typeof(System.Collections.IEnumerable).IsAssignableFrom(nex.Arguments[1].Type)))
            {
                Type[] newTypeArguments = arguments.Select(argument => argument.Type).ToArray();
                Type newType = nex.Type.GetGenericTypeDefinition().MakeGenericType(newTypeArguments);

                MemberInfo[] membersInfo = newType.GetProperties();
                return Expression.New(newType.GetConstructors()[0], arguments, membersInfo);
            }

            if (nex.Members != null)
            {
                return Expression.New(nex.Constructor, arguments, nex.Members);
            }
            return Expression.New(nex.Constructor, arguments);
        }

        public virtual Expression VisitNewArray(NewArrayExpression na)
        {
            IEnumerable<Expression> initializers = this.VisitExpressionList(na.Expressions);
            if (initializers == na.Expressions)
            {
                return na;
            }
            if (na.NodeType == ExpressionType.NewArrayInit)
            {
                return Expression.NewArrayInit(na.Type.GetElementType(), initializers);
            }
            return Expression.NewArrayBounds(na.Type.GetElementType(), initializers);
        }

        public virtual Expression VisitParameter(ParameterExpression p)
        {
            return p;
        }

        public virtual Expression VisitTypeIs(TypeBinaryExpression b)
        {
            Expression expression = this.Visit(b.Expression);
            if (expression != b.Expression)
            {
                return Expression.TypeIs(expression, b.TypeOperand);
            }
            return b;
        }

        public virtual Expression VisitUnary(UnaryExpression u)
        {
            Expression operand = this.Visit(u.Operand);
            if (operand != u.Operand)
            {
                return Expression.MakeUnary(u.NodeType, operand, u.Type, u.Method);
            }
            return u;
        }
    }


    /*
    public abstract class ExpressionVisitor
    {
        public ExpressionVisitor()
        {
        }


        public static BinaryExpression MakeBinaryExpression(ExpressionType eType, Expression left, Expression right)
        {
            switch (eType)
            {
                case ExpressionType.ArrayIndex:
                case ExpressionType.ArrayLength:
                case ExpressionType.Call:
                //case ExpressionType.CallVirtual:
                //case ExpressionType.Cast:                
                case ExpressionType.Conditional:
                case ExpressionType.Constant:
                case ExpressionType.Convert:
                case ExpressionType.ConvertChecked:
                    throw new ArgumentException("eType: " + eType);


                case ExpressionType.AddChecked:
                    return Expression.AddChecked(left, right);

                case ExpressionType.And:
                    return Expression.And(left, right);

                case ExpressionType.AndAlso:
                    return Expression.AndAlso(left, right);

                case ExpressionType.Coalesce:
                    return Expression.Coalesce(left, right);

                case ExpressionType.Divide:
                    return Expression.Divide(left, right);

                case ExpressionType.Equal:
                    return Expression.Equal(left, right);

                case ExpressionType.ExclusiveOr:
                    return Expression.ExclusiveOr(left, right);

                case ExpressionType.GreaterThan:
                    return Expression.GreaterThan(left, right);

                case ExpressionType.GreaterThanOrEqual:
                    return Expression.GreaterThanOrEqual(left, right);

                case ExpressionType.LeftShift:
                    return Expression.LeftShift(left, right);

                case ExpressionType.LessThan:
                    return Expression.LessThan(left, right);

                case ExpressionType.LessThanOrEqual:
                    return Expression.LessThanOrEqual(left, right);

                case ExpressionType.Modulo:
                    return Expression.Modulo(left, right);

                case ExpressionType.Multiply:
                    return Expression.Multiply(left, right);

                case ExpressionType.MultiplyChecked:
                    return Expression.MultiplyChecked(left, right);

                case ExpressionType.NotEqual:
                    return Expression.NotEqual(left, right);

                case ExpressionType.Or:
                    return Expression.Or(left, right);

                case ExpressionType.OrElse:
                    return Expression.OrElse(left, right);

                case ExpressionType.RightShift:
                    return Expression.RightShift(left, right);

                case ExpressionType.Subtract:
                    return Expression.Subtract(left, right);

                case ExpressionType.SubtractChecked:
                    return Expression.SubtractChecked(left, right);
            }
            return Expression.Add(left, right);
        }

        public static MemberExpression MakeMemberExpression(Expression expr, MemberInfo mi)
        {
            FieldInfo field = mi as FieldInfo;
            if (field != null)
            {
                return Expression.Field(expr, field);
            }
            PropertyInfo property = mi as PropertyInfo;
            if (property == null)
            {
                throw new Exception("Member is not a Field or Property: " + mi);
            }
            return Expression.Property(expr, property);
        }

        public static MethodCallExpression MakeMethodCallExpression(ExpressionType eType, Expression obj, MethodInfo method, IEnumerable<Expression> args)
        {
            return Expression.Call(obj, method, args);
        }


        public static UnaryExpression MakeUnaryExpression(ExpressionType eType, Expression operand, Type type)
        {
            switch (eType)
            {
                case ExpressionType.ArrayLength:
                    return Expression.ArrayLength(operand);

                //case ExpressionType.Cast:
                //    return Expression.Cast(operand, type);

                case ExpressionType.Convert:
                    return Expression.Convert(operand, type);

                case ExpressionType.ConvertChecked:
                    return Expression.ConvertChecked(operand, type);

                case ExpressionType.Negate:
                    return Expression.Negate(operand);

                case ExpressionType.NegateChecked:
                    return Expression.NegateChecked(operand);

                case ExpressionType.Not:
                    return Expression.Not(operand);

                case ExpressionType.Quote:
                    return Expression.Quote(operand);

                case ExpressionType.TypeAs:
                    return Expression.TypeAs(operand, type);
            }
            throw new ArgumentException("eType: " + eType);
        }

        public virtual Expression Visit(Expression exp)
        {
            if (exp == null)
            {
                return exp;
            }
            switch (exp.NodeType)
            {
                case ExpressionType.Add:
                case ExpressionType.AddChecked:
                case ExpressionType.And:
                case ExpressionType.AndAlso:
                case ExpressionType.ArrayIndex:
                case ExpressionType.Coalesce:
                case ExpressionType.Divide:
                case ExpressionType.Equal:
                case ExpressionType.ExclusiveOr:
                case ExpressionType.GreaterThan:
                case ExpressionType.GreaterThanOrEqual:
                case ExpressionType.LeftShift:
                case ExpressionType.LessThan:
                case ExpressionType.LessThanOrEqual:
                case ExpressionType.Modulo:
                case ExpressionType.Multiply:
                case ExpressionType.MultiplyChecked:
                case ExpressionType.NotEqual:
                case ExpressionType.Or:
                case ExpressionType.OrElse:
                case ExpressionType.RightShift:
                case ExpressionType.Subtract:
                case ExpressionType.SubtractChecked:
                    return this.VisitBinary((BinaryExpression)exp);

                case ExpressionType.Call:
                //case ExpressionType.CallVirtual:
                    return this.VisitMethodCall((MethodCallExpression)exp);

                case ExpressionType.Conditional:
                    return this.VisitConditional((ConditionalExpression)exp);

                case ExpressionType.Constant:
                    return this.VisitConstant((ConstantExpression)exp);

                case ExpressionType.Funclet:
                    return this.VisitFunclet((FuncletExpression)exp);

                case ExpressionType.Invoke:
                    return this.VisitInvocation((InvocationExpression)exp);

                case ExpressionType.Lambda:
                    return this.VisitLambda((LambdaExpression)exp);

                //case ExpressionType.Lift:
                //case ExpressionType.LiftEqual:
                //case ExpressionType.LiftFalse:
                //case ExpressionType.LiftNotEqual:
                //case ExpressionType.LiftTrue:
                //    return this.VisitLift((LiftExpression)exp);

                case ExpressionType.ListInit:
                    return this.VisitListInit((ListInitExpression)exp);

                case ExpressionType.MemberAccess:
                    return this.VisitMemberAccess((MemberExpression)exp);

                case ExpressionType.MemberInit:
                    return this.VisitMemberInit((MemberInitExpression)exp);

                case ExpressionType.New:
                    return this.VisitNew((NewExpression)exp);

                case ExpressionType.NewArrayInit:
                case ExpressionType.NewArrayBounds:
                    return this.VisitNewArray((NewArrayExpression)exp);

                case ExpressionType.Parameter:
                    return this.VisitParameter((ParameterExpression)exp);

                case ExpressionType.TypeIs:
                    return this.VisitTypeIs((TypeBinaryExpression)exp);
            }
            return this.VisitUnary((UnaryExpression)exp);
        }

        public virtual Expression VisitBinary(BinaryExpression b)
        {
            Expression left = this.Visit(b.Left);
            Expression right = this.Visit(b.Right);
            if ((left == b.Left) && (right == b.Right))
            {
                return b;
            }
            return Expression.MakeBinary(b.NodeType, left, right, b.IsLiftedToNull, b.Method);
        }

        public virtual MemberBinding VisitBinding(MemberBinding binding)
        {
            switch (binding.BindingType)
            {
                case MemberBindingType.MemberBinding:
                    return this.VisitMemberMemberBinding((MemberMemberBinding)binding);

                case MemberBindingType.ListBinding:
                    return this.VisitMemberListBinding((MemberListBinding)binding);
            }
            return this.VisitMemberAssignment((MemberAssignment)binding);
        }

        public virtual IEnumerable<MemberBinding> VisitBindingList(ReadOnlyCollection<MemberBinding> original)
        {
            List<MemberBinding> list = null;
            int num = 0;
            int capacity = original.Count;
            while (num < capacity)
            {
                MemberBinding item = this.VisitBinding(original[num]);
                if (list != null)
                {
                    list.Add(item);
                }
                else if (item != original[num])
                {
                    list = new List<MemberBinding>(capacity);
                    for (int i = 0; i < num; i++)
                    {
                        list.Add(original[i]);
                    }
                    list.Add(item);
                }
                num++;
            }
            if (list != null)
            {
                return list;
            }
            return original;
        }

        public virtual Expression VisitConditional(ConditionalExpression c)
        {
            Expression test = this.Visit(c.Test);
            Expression ifTrue = this.Visit(c.IfTrue);
            Expression ifFalse = this.Visit(c.IfFalse);
            if (((test == c.Test) && (ifTrue == c.IfTrue)) && (ifFalse == c.IfFalse))
            {
                return c;
            }
            return Expression.Condition(test, ifTrue, ifFalse);
        }

        public virtual Expression VisitConstant(ConstantExpression c)
        {
            return c;
        }

        public virtual ReadOnlyCollection<Expression> VisitExpressionList(ReadOnlyCollection<Expression> original)
        {
            List<Expression> sequence = null;
            int num = 0;
            int capacity = original.Count;
            while (num < capacity)
            {
                Expression item = this.Visit(original[num]);
                if (sequence != null)
                {
                    sequence.Add(item);
                }
                else if (item != original[num])
                {
                    sequence = new List<Expression>(capacity);
                    for (int i = 0; i < num; i++)
                    {
                        sequence.Add(original[i]);
                    }
                    sequence.Add(item);
                }
                num++;
            }
            if (sequence != null)
            {
                return sequence.AsReadOnly();
            }
            return original;
        }

        public virtual Expression VisitFunclet(FuncletExpression f)
        {
            return f;
        }

        public virtual Expression VisitInvocation(InvocationExpression iv)
        {
            IEnumerable<Expression> arguments = this.VisitExpressionList(iv.Arguments);
            Expression expression = this.Visit(iv.Expression);
            if ((arguments == iv.Arguments) && (expression == iv.Expression))
            {
                return iv;
            }
            return Expression.Invoke(expression, arguments);
        }

        public virtual Expression VisitLambda(LambdaExpression lambda)
        {
            Expression body = this.Visit(lambda.Body);
            if (body != lambda.Body)
            {
                return Expression.Lambda(lambda.Type, body, lambda.Parameters);
            }
            return lambda;
        }

        //public virtual Expression VisitLift(LiftExpression lift)
        //{
        //    Expression expression = this.Visit(lift.Expression);
        //    ReadOnlyCollection<Expression> arguments = this.VisitExpressionList(lift.Arguments);
        //    if ((expression == lift.Expression) && (arguments == lift.Arguments))
        //    {
        //        return lift;
        //    }
        //    return Expression.MakeLift(lift.NodeType, expression, lift.Parameters, arguments);
        //}

        public virtual Expression VisitListInit(ListInitExpression init)
        {
            NewExpression newExpression = this.VisitNew(init.NewExpression);
            IEnumerable<Expression> initializers = this.VisitExpressionList(init.Expressions);
            if ((newExpression == init.NewExpression) && (initializers == init.Expressions))
            {
                return init;
            }
            return Expression.ListInit(newExpression, initializers);
        }

        public virtual Expression VisitMemberAccess(MemberExpression m)
        {
            Expression expression = this.Visit(m.Expression);
            if (expression != m.Expression)
            {
                return Expression.MakeMemberAccess(expression, m.Member);
            }
            return m;
        }

        public virtual MemberAssignment VisitMemberAssignment(MemberAssignment assignment)
        {
            Expression expression = this.Visit(assignment.Expression);
            if (expression != assignment.Expression)
            {
                return Expression.Bind(assignment.Member, expression);
            }
            return assignment;
        }

        public virtual Expression VisitMemberInit(MemberInitExpression init)
        {
            NewExpression newExpression = this.VisitNew(init.NewExpression);
            IEnumerable<MemberBinding> bindings = this.VisitBindingList(init.Bindings);
            if ((newExpression == init.NewExpression) && (bindings == init.Bindings))
            {
                return init;
            }
            return Expression.MemberInit(newExpression, bindings);
        }

        public virtual MemberListBinding VisitMemberListBinding(MemberListBinding binding)
        {
            IEnumerable<Expression> initializers = this.VisitExpressionList(binding.Expressions);
            if (initializers != binding.Expressions)
            {
                return Expression.ListBind(binding.Member, initializers);
            }
            return binding;
        }

        public virtual MemberMemberBinding VisitMemberMemberBinding(MemberMemberBinding binding)
        {
            IEnumerable<MemberBinding> bindings = this.VisitBindingList(binding.Bindings);
            if (bindings != binding.Bindings)
            {
                return Expression.MemberBind(binding.Member, bindings);
            }
            return binding;
        }

        public virtual Expression VisitMethodCall(MethodCallExpression m)
        {
            Expression instance = this.Visit(m.Object);
            IEnumerable<Expression> arguments = this.VisitExpressionList(m.Arguments);
            if ((instance == m.Object) && (arguments == m.Arguments))
            {
                return m;
            }
            return Expression.MakeCall(m.NodeType, instance, m.Method, arguments);
        }

        public virtual NewExpression VisitNew(NewExpression nex)
        {
            IEnumerable<Expression> arguments = this.VisitExpressionList(nex.Arguments);
            if (arguments != nex.Arguments)
            {
                return Expression.New(nex.Constructor, arguments);
            }
            return nex;
        }

        public virtual Expression VisitNewArray(NewArrayExpression na)
        {
            IEnumerable<Expression> initializers = this.VisitExpressionList(na.Expressions);
            if (initializers == na.Expressions)
            {
                return na;
            }
            if (na.NodeType == ExpressionType.NewArrayInit)
            {
                return Expression.NewArrayInit(na.Type.GetElementType(), initializers);
            }
            return Expression.NewArrayBounds(na.Type.GetElementType(), initializers);
        }

        public virtual Expression VisitParameter(ParameterExpression p)
        {
            return p;
        }

        public virtual Expression VisitTypeIs(TypeBinaryExpression b)
        {
            Expression expression = this.Visit(b.Expression);
            if (expression != b.Expression)
            {
                return Expression.TypeIs(expression, b.TypeOperand);
            }
            return b;
        }

        public virtual Expression VisitUnary(UnaryExpression u)
        {
            Expression operand = this.Visit(u.Operand);
            if (operand != u.Operand)
            {
                return Expression.MakeUnary(u.NodeType, operand, u.Type, u.Method);
            }
            return u;
        }
    }*/
}