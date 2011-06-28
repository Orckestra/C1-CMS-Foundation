using System;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Core.Routing.Pages;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
    internal sealed class PathInfoGuidFunction : StandardFunctionBase
    {
        public PathInfoGuidFunction(EntityTokenFactory entityTokenFactory)
            : base("PathInfoGuid", "Composite.Web.Request", typeof(string), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider segmentDropDown = StandardWidgetFunctions.DropDownList(
                    typeof(PathInfoFunction), "SegmentSelectorOptions", "Key", "Value", false, true);

                yield return new StandardFunctionParameterProfile(
                    "Segment", typeof(int?), true, new ConstantValueProvider(0), segmentDropDown);

                yield return new StandardFunctionParameterProfile(
                    "AutoApprove", typeof(bool), false, new ConstantValueProvider(true), StandardWidgetFunctions.CheckBoxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            int segment = (int)parameters.GetParameter("Segment");
            bool autoApprove = (bool)parameters.GetParameter("AutoApprove");

            string value = PathInfoFunction.GetPathInfoSegment(segment);

            Guid guidValue;
            if (string.IsNullOrEmpty(value) || !Guid.TryParse(value, out guidValue))
            {
                return null;
            }

            if (autoApprove)
            {
                C1PageRoute.RegisterPathInfoUsage();
            }

            return guidValue;
        }
    }
}