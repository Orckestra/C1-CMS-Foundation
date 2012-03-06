using System;


namespace Composite.C1Console.Workflow.Foundation
{
    internal sealed class FormsWorkflowEventService : IFormsWorkflowEventService
    {
        public event EventHandler<FormEventArgs> Save;
        public event EventHandler<FormEventArgs> SaveAndPublish;
        public event EventHandler<FormEventArgs> Next;
        public event EventHandler<FormEventArgs> Previous;
        public event EventHandler<FormEventArgs> Finish;
        public event EventHandler<FormEventArgs> Cancel;

        public event EventHandler<FormEventArgs> Preview;

        public event EventHandler<FormEventArgs> CustomEvent01;
        public event EventHandler<FormEventArgs> CustomEvent02;
        public event EventHandler<FormEventArgs> CustomEvent03;
        public event EventHandler<FormEventArgs> CustomEvent04;
        public event EventHandler<FormEventArgs> CustomEvent05;

        public event EventHandler<FormEventArgs> ChildWorkflowDone;



        public void FireSaveEvent(FormEventArgs formEventArgs)
        {
            if (Save != null)
            {
                EventHandler<FormEventArgs> save = Save;
                save(null, formEventArgs);
            }
        }


        public void FireSaveAndPublishEvent(FormEventArgs formEventArgs)
        {
            if (SaveAndPublish != null)
            {
                EventHandler<FormEventArgs> saveAndPublish = SaveAndPublish;
                saveAndPublish(null, formEventArgs);
            }
        }


        public void FireNextEvent(FormEventArgs formEventArgs)
        {
            if (Next != null)
            {
                EventHandler<FormEventArgs> next = Next;
                next(null, formEventArgs);
            }
        }



        public void FirePreviousEvent(FormEventArgs formEventArgs)
        {
            if (Previous != null)
            {
                EventHandler<FormEventArgs> previous = Previous;
                previous(null, formEventArgs);
            }
        }



        public void FireFinishEvent(FormEventArgs formEventArgs)
        {
            if (Finish != null)
            {
                EventHandler<FormEventArgs> finish = Finish;
                finish(null, formEventArgs);
            }
        }



        public void FireCancelEvent(FormEventArgs formEventArgs)
        {
            if (Cancel != null)
            {
                EventHandler<FormEventArgs> cancel = Cancel;
                cancel(null, formEventArgs);
            }
        }



        public void FirePreviewEvent(FormEventArgs formEventArgs)
        {
            if (Preview != null)
            {
                EventHandler<FormEventArgs> preview = Preview;
                preview(null, formEventArgs);
            }
        }



        public void FireCustomEvent01(FormEventArgs formEventArgs)
        {
            EventHandler<FormEventArgs> customEvent = CustomEvent01;

            if (customEvent != null)
            {
                customEvent(null, formEventArgs);
            }
        }



        public void FireCustomEvent02(FormEventArgs formEventArgs)
        {
            EventHandler<FormEventArgs> customEvent = CustomEvent02;

            if (customEvent != null)
            {
                customEvent(null, formEventArgs);
            }
        }



        public void FireCustomEvent03(FormEventArgs formEventArgs)
        {
            EventHandler<FormEventArgs> customEvent = CustomEvent03;

            if (customEvent != null)
            {
                customEvent(null, formEventArgs);
            }
        }



        public void FireCustomEvent04(FormEventArgs formEventArgs)
        {
            EventHandler<FormEventArgs> customEvent = CustomEvent04;

            if (customEvent != null)
            {
                customEvent(null, formEventArgs);
            }
        }



        public void FireCustomEvent05(FormEventArgs formEventArgs)
        {
            EventHandler<FormEventArgs> customEvent = CustomEvent05;

            if (customEvent != null)
            {
                customEvent(null, formEventArgs);
            }
        }



        public void FireChildWorkflowDoneEvent(FormEventArgs formEventArgs)
        {
            if (ChildWorkflowDone != null)
            {
                EventHandler<FormEventArgs> childWorkflowDone = ChildWorkflowDone;
                childWorkflowDone(null, formEventArgs);
            }
        }
    }
}
