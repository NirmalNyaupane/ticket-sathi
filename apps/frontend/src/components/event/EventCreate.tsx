"use client";
import DashboardTopContent from "@/components/organizer/dashboard/DashboardTopContent";

import { EventType } from "@/__generated__/graphql";
import CustomTextArea from "@/components/common/CustomTextArea";
import DatePicker from "@/components/common/DatePicker";
import DragAndDropImage from "@/components/common/DragAndDropImage";
import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DragDropMultipleImages from "../common/DragAndDropMultipleImage";

const EventCeateUpdate = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <InputField type="text" label="Name" />
                    <CustomTextArea label="Description" />
                    <div className="grid gap-3">
                      <Label htmlFor="status">Event Type</Label>
                      <Select>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select types" />
                        </SelectTrigger>

                        <SelectContent>
                          {Object.values(EventType).map((type) => {
                            return (
                              <SelectItem value={type} key={type}>
                                {type}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <InputField type="text" label="Venue" />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <DragDropMultipleImages onChange={(e) => console.log(e)} />
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Event Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Category</Label>
                      <Select>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Cover Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <DragAndDropImage
                    onChange={(e) => {
                      console.log(e);
                    }}
                  />
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle>Event Date</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <DatePicker
                    placeholder="Event start date"
                    label="Event start date"
                    disablePastDate={true}
                  />
                  <DatePicker
                    placeholder="Event end date"
                    label="Event end date"
                    disablePastDate={true}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventCeateUpdate;
