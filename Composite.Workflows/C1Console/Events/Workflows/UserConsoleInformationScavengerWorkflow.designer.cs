using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
using System.Drawing;
using System.Reflection;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;
using Composite.C1Console.Workflow;

namespace Composite.C1Console.Events.Workflows
{
    partial class UserConsoleInformationScavengerWorkflow
    {
        #region Designer generated code
        
        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this� method with the code editor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
        private void InitializeComponent()
        {
            this.CanModifyActivities = true;
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.scavengeCodeActivity_Scavenge = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.delayActivity1 = new System.Workflow.Activities.DelayActivity();
            this.scavangeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.waitEventDrivenActivity_Timeout = new System.Workflow.Activities.EventDrivenActivity();
            this.waitStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.scavengeStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.waitStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "waitStateActivity";
            // 
            // scavengeCodeActivity_Scavenge
            // 
            this.scavengeCodeActivity_Scavenge.Name = "scavengeCodeActivity_Scavenge";
            this.scavengeCodeActivity_Scavenge.ExecuteCode += new System.EventHandler(this.scavengeCodeActivity_Scavenge_ExecuteCode);
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "scavengeStateActivity";
            // 
            // delayActivity1
            // 
            this.delayActivity1.Name = "delayActivity1";
            this.delayActivity1.TimeoutDuration = System.TimeSpan.Parse("00:00:00");
            this.delayActivity1.InitializeTimeoutDuration += new System.EventHandler(this.OnInitializeTimeout);
            // 
            // scavangeStateInitializationActivity
            // 
            this.scavangeStateInitializationActivity.Activities.Add(this.scavengeCodeActivity_Scavenge);
            this.scavangeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.scavangeStateInitializationActivity.Name = "scavangeStateInitializationActivity";
            // 
            // waitEventDrivenActivity_Timeout
            // 
            this.waitEventDrivenActivity_Timeout.Activities.Add(this.delayActivity1);
            this.waitEventDrivenActivity_Timeout.Activities.Add(this.setStateActivity1);
            this.waitEventDrivenActivity_Timeout.Name = "waitEventDrivenActivity_Timeout";
            // 
            // waitStateInitializationActivity
            // 
            this.waitStateInitializationActivity.Name = "waitStateInitializationActivity";
            // 
            // scavengeStateActivity
            // 
            this.scavengeStateActivity.Activities.Add(this.scavangeStateInitializationActivity);
            this.scavengeStateActivity.Name = "scavengeStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // waitStateActivity
            // 
            this.waitStateActivity.Activities.Add(this.waitStateInitializationActivity);
            this.waitStateActivity.Activities.Add(this.waitEventDrivenActivity_Timeout);
            this.waitStateActivity.Name = "waitStateActivity";
            // 
            // UserConsoleInformationScavengerWorkflow
            // 
            this.Activities.Add(this.waitStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.scavengeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "waitStateActivity";
            this.Name = "UserConsoleInformationScavengerWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateInitializationActivity waitStateInitializationActivity;
        private StateActivity finalStateActivity;
        private DelayActivity delayActivity1;
        private StateInitializationActivity scavangeStateInitializationActivity;
        private EventDrivenActivity waitEventDrivenActivity_Timeout;
        private StateActivity scavengeStateActivity;
        private CodeActivity scavengeCodeActivity_Scavenge;
        private SetStateActivity setStateActivity1;
        private SetStateActivity setStateActivity2;
        private StateActivity waitStateActivity;











































































































    }
}
