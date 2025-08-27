"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Car,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  Navigation,
  Users,
} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  pickup: z.object({
    address: z.string().min(1, "Pickup location is required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  destination: z.object({
    address: z.string().min(1, "Destination is required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  date: z.string().default("today"),
  time: z.string().default("now"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  rideType: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RequestRidePage() {
  const dispatch = useAppDispatch();
  const { fareEstimates, loading, error } = useAppSelector(
    (state) => state.rides
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: {
        address: "",
        coordinates: { lat: 0, lng: 0 },
      },
      destination: {
        address: "",
        coordinates: { lat: 0, lng: 0 },
      },
      date: "today",
      time: "now",
      paymentMethod: "",
      rideType: "",
    },
  });

  const watchedPickup = form.watch("pickup.address");
  const watchedDestination = form.watch("destination.address");

  useEffect(() => {
    if (watchedPickup && watchedDestination) {
      const pickup = form.getValues("pickup");
      const destination = form.getValues("destination");

      if (pickup.coordinates.lat !== 0 && destination.coordinates.lat !== 0) {
        dispatch(getFareEstimate({ pickup, destination }));
      }
    } else {
      dispatch(clearFareEstimates());
    }
  }, [watchedPickup, watchedDestination, dispatch, form]);

  const onSubmit = async (data: FormData) => {
    console.log("[v0] Form submitted with data:", data);

    if (!data.rideType) {
      form.setError("rideType", { message: "Please select a ride type" });
      return;
    }

    const rideRequest = {
      pickup: data.pickup,
      destination: data.destination,
      rideType: data.rideType,
      paymentMethod: data.paymentMethod,
      scheduledTime: data.time === "now" ? undefined : data.time,
    };

    try {
      await dispatch(requestRide(rideRequest)).unwrap();
      // Redirect to tracking page or show success message
      console.log("[v0] Ride requested successfully");
    } catch (error) {
      console.error("[v0] Failed to request ride:", error);
    }
  };

  const handleLocationSelect = (
    field: "pickup" | "destination",
    address: string
  ) => {
    // Mock coordinates - in real app, you'd use Google Places API or similar
    const mockCoordinates = {
      "Dhaka University": { lat: 23.7356, lng: 90.3918 },
      Shahbag: { lat: 23.7389, lng: 90.3944 },
      Dhanmondi: { lat: 23.7461, lng: 90.3742 },
      Gulshan: { lat: 23.7806, lng: 90.4193 },
      "New Market": { lat: 23.7272, lng: 90.3854 },
      Uttara: { lat: 23.8759, lng: 90.3795 },
    };

    const coordinates = mockCoordinates[
      address as keyof typeof mockCoordinates
    ] || { lat: 23.8103, lng: 90.4125 };

    form.setValue(`${field}.address`, address);
    form.setValue(`${field}.coordinates`, coordinates);
  };

  const handleRideTypeSelect = (rideType: string) => {
    form.setValue("rideType", rideType);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[80vh]">
          {/* Left side - Content and Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Go anywhere with Uber
              </h1>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-card border rounded-lg p-6 shadow-sm space-y-6"
              >
                {/* Location Inputs */}
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="pickup.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Pickup location"
                              className="pl-10 h-12 text-base"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value) {
                                  handleLocationSelect(
                                    "pickup",
                                    e.target.value
                                  );
                                }
                              }}
                            />
                            <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destination.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-3 h-4 w-4 bg-foreground rounded-sm" />
                            <Input
                              placeholder="Dropoff location"
                              className="pl-10 h-12 text-base bg-muted"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value) {
                                  handleLocationSelect(
                                    "destination",
                                    e.target.value
                                  );
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Date
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              value="Today"
                              readOnly
                              className="pl-10 h-12 text-base cursor-pointer"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Time
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="now">Now</SelectItem>
                            <SelectItem value="15min">In 15 minutes</SelectItem>
                            <SelectItem value="30min">In 30 minutes</SelectItem>
                            <SelectItem value="1hour">In 1 hour</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Payment Method
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select payment method" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="card">
                            Credit/Debit Card
                          </SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="wallet">Digital Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loading.fareEstimate && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Getting fare estimates...
                    </span>
                  </div>
                )}

                {fareEstimates.length > 0 && (
                  <div className="space-y-3">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Choose a ride
                    </FormLabel>
                    <div className="space-y-2">
                      {fareEstimates.map((estimate) => (
                        <Card
                          key={estimate.rideType}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            form.watch("rideType") === estimate.rideType
                              ? "ring-2 ring-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() =>
                            handleRideTypeSelect(estimate.rideType)
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-lg">
                                  {estimate.rideType === "UberX" && (
                                    <Car className="h-5 w-5" />
                                  )}
                                  {estimate.rideType === "UberXL" && (
                                    <Users className="h-5 w-5" />
                                  )}
                                  {estimate.rideType === "UberBlack" && (
                                    <Car className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-semibold text-base">
                                    {estimate.rideType}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {estimate.estimatedTime} min •{" "}
                                    {estimate.distance.toFixed(1)} km
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">
                                  {estimate.currency} {estimate.estimatedFare}
                                </div>
                                {estimate.rideType ===
                                  form.watch("rideType") && (
                                  <Badge variant="default" className="text-xs">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <FormMessage>
                      {form.formState.errors.rideType?.message}
                    </FormMessage>
                  </div>
                )}

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  {fareEstimates.length === 0 ? (
                    <Button
                      type="button"
                      className="w-full h-12 text-base font-semibold"
                      onClick={() => {
                        const pickup = form.getValues("pickup");
                        const destination = form.getValues("destination");
                        if (pickup.address && destination.address) {
                          dispatch(getFareEstimate({ pickup, destination }));
                        }
                      }}
                      disabled={
                        !watchedPickup ||
                        !watchedDestination ||
                        loading.fareEstimate
                      }
                    >
                      {loading.fareEstimate ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Getting prices...
                        </>
                      ) : (
                        "See prices"
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold"
                      disabled={
                        loading.requestRide ||
                        !form.watch("rideType") ||
                        !form.watch("paymentMethod")
                      }
                    >
                      {loading.requestRide ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Requesting ride...
                        </>
                      ) : (
                        "Request ride"
                      )}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-12 text-base text-muted-foreground hover:text-foreground"
                  >
                    Log in to see your recent activity
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Right side - Illustration */}
          <div className="relative">
            <div className="relative w-full h-[500px] lg:h-[600px]">
              <img
                src=""
                alt="Woman getting out of blue Uber car in urban setting"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
