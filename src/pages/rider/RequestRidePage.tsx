import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRideRequestMutation } from "@/redux/features/ride/riders.api";
import { zodResolver } from "@hookform/resolvers/zod";

import { DollarSign, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import z from "zod";

// todo: navigate with res -> show modal with fare -> tracking page
const formSchema = z.object({
  pickup: z.object({
    address: z.string().min(1, { message: "Pickup location is required." }),
    coordinates: z.object({
      lat: z.number().default(0),
      lng: z.number().default(0),
    }),
  }),
  destination: z.object({
    address: z.string().min(1, { message: "Destination is required." }),
    coordinates: z.object({
      lat: z.number().default(0),
      lng: z.number().default(0),
    }),
  }),
});

const RideBooking = () => {
  const [rideRequest] = useRideRequestMutation();

  const [fareEstimate, setFareEstimate] = useState(0);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      pickup: {
        address: "Farmgate",
        coordinates: { lat: 23.7356, lng: 90.3918 },
      },
      destination: {
        address: "Airport",
        coordinates: { lat: 23.7389, lng: 90.3944 },
      },
    },
    mode: "onSubmit",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await rideRequest(data).unwrap();
      setFareEstimate(res?.data?.data?.fare);
    } catch (error) {
      toast.warning("Something went wrong");
    }
  };

  const handleBookRide = async () => {
    navigate("/rider/history");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Book Your <span className="text-primary">Ride</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your trip details and get an instant fare estimate
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8">
                      {/* Pickup Location */}
                      <div>
                        {/* Location Inputs */}
                        <FormField
                          control={form.control}
                          name="pickup.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Location</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Enter pickup address"
                                    className="pl-10 text-base"
                                    {...field}
                                  />
                                  <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Destination */}
                      <div>
                        <FormField
                          control={form.control}
                          name="destination.address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination Location</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Enter destination address"
                                    className="pl-10 text-base"
                                    {...field}
                                  />
                                  <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <Button
                          className="w-full cursor-pointer hover:shadow-primary"
                          type="submit"
                          size="lg"
                        >
                          Fare Estimate
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Fare Estimation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Fare Estimate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {fareEstimate ? (
                  <>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        ৳{fareEstimate}
                      </div>
                      <p className="text-muted-foreground">Estimated fare</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Total fare
                        </span>
                        <span>৳{fareEstimate}</span>
                      </div>
                    </div>

                    <Separator />

                    <ConfirmModal onConfirm={handleBookRide}>
                      <Button
                        className="w-full cursor-pointer hover:shadow-primary"
                        size="lg"
                      >
                        Book Ride - ৳{fareEstimate}
                      </Button>
                    </ConfirmModal>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Enter pickup and destination to see fare estimate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideBooking;
