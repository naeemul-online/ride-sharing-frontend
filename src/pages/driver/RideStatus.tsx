import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useActiveStatusMutation } from "@/redux/features/driver/driver.api";
import { useGetAvailableRideQuery } from "@/redux/features/ride/riders.api";

import { zodResolver } from "@hookform/resolvers/zod";
import { Car, MapPin, Power } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Status update schema
const statusSchema = z.object({
  status: z.enum(["accept", "picked_up", "completed"], {
    required_error: "Please select a status",
  }),
});

// Online status schema
const onlineStatusSchema = z.object({
  isOnline: z.boolean(),
});

// Location update schema
const locationSchema = z.object({
  location: z.object({
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    lng: z
      .number()
      .min(-180)
      .max(180, "Longitude must be between -180 and 180"),
  }),
});

type StatusFormData = z.infer<typeof statusSchema>;
type OnlineStatusFormData = z.infer<typeof onlineStatusSchema>;
type LocationFormData = z.infer<typeof locationSchema>;

export default function DriverFeatures() {
  const { data, isLoading } = useGetAvailableRideQuery(undefined);
  const [isOnlineActiveStatus] = useActiveStatusMutation();

  // Status form
  const statusForm = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
  });

  // Online status form
  const onlineStatusForm = useForm<OnlineStatusFormData>({
    resolver: zodResolver(onlineStatusSchema),
    defaultValues: {
      isOnline: false,
    },
  });

  // Location form
  const locationForm = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: {
        lat: 23.8103,
        lng: 90.4125,
      },
    },
  });

  const onStatusSubmit = (data: StatusFormData) => {
    // Mock API call
    console.log("Status update:", data);
    toast.success("Status Updated", {
      description: `Your status has been updated to: ${data.status}`,
    });

    // Mock success response
    setTimeout(() => {
      toast.success("Status Updated", {
        description: `Your status has been updated to: ${data.status}`,
      });
    }, 1000);
  };

  const onOnlineStatusSubmit = async (data: OnlineStatusFormData) => {
    try {
      const toastId = toast.loading("Status updating...");
      await isOnlineActiveStatus(data);
      toast.success("Your status has been updated", { id: toastId });
    } catch (error) {
      console.log(error);
    }
  };

  const onLocationSubmit = (data: LocationFormData) => {
    // Mock API call
    console.log("Location update:", data);
    toast.success("Status Updated", {
      description: `Your status has been updated to: ${data}`,
    });

    // Mock success response
    setTimeout(() => {
      toast.success("Status Updated", {
        description: `Your status has been updated to: ${data}`,
      });
    }, 1000);
  };

  if (isLoading && !data) <Skeleton />;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your ride status, availability, and location
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {/* Status Update Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Ride Status
                </CardTitle>
                <CardDescription>
                  Update your current ride status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...statusForm}>
                  <form
                    onSubmit={statusForm.handleSubmit(onStatusSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={statusForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="accept">
                                Accept Ride
                              </SelectItem>
                              <SelectItem value="picked_up">
                                Picked Up
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Update Status
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Online Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Power className="h-5 w-5 text-primary" />
                  Availability
                </CardTitle>
                <CardDescription>
                  Toggle your online/offline status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...onlineStatusForm}>
                  <form
                    onSubmit={onlineStatusForm.handleSubmit(
                      onOnlineStatusSubmit
                    )}
                    className="space-y-4"
                  >
                    <FormField
                      control={onlineStatusForm.control}
                      name="isOnline"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Online Status
                            </FormLabel>
                            <div className="text-sm text-muted-foreground">
                              {field.value
                                ? "You are currently online"
                                : "You are currently offline"}
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Update Availability
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Location Update Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
                <CardDescription>
                  Update your current location coordinates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...locationForm}>
                  <form
                    onSubmit={locationForm.handleSubmit(onLocationSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={locationForm.control}
                      name="location.lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              placeholder="23.8103"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={locationForm.control}
                      name="location.lng"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              placeholder="90.4125"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Update Location
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Mock Data Display */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Current Driver State (Mock Data)</CardTitle>
              <CardDescription>
                This shows the current state that would be sent to your backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Status</h4>
                  <code className="text-sm">
                    {JSON.stringify(
                      { status: statusForm.watch("status") || "not_set" },
                      null,
                      2
                    )}
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Online Status</h4>
                  <code className="text-sm">
                    {JSON.stringify(
                      { isOnline: onlineStatusForm.watch("isOnline") },
                      null,
                      2
                    )}
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Location</h4>
                  <code className="text-sm">
                    {JSON.stringify(
                      { location: locationForm.watch("location") },
                      null,
                      2
                    )}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
