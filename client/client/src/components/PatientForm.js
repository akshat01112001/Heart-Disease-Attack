import React, { useState } from 'react'
import { Grid, TextField, Button, FormControl, FormGroup, FormLabel, Container, FormControlLabel, Checkbox } from '@mui/material'

const PatientForm = () => {
    const [formData, setFormData] = useState({
        HighBP: false,
        HighChol: false,
        CholCheck: false,
        BMI: 0,
        Smoker: false,
        Stroke: false,
        Diabetes: false,
        PhysActivity: false,
        Fruits: false,
        Veggies: false,
        HvyAlcoholConsump: false,
        AnyHealthcare: false,
        NoDocbcCost: false,
        GenHlth: 0,
        MentHlth: 0,
        PhysHlth: 0,
        DiffWalk: false,
        Sex: false,
        Age: 0,
        Education: 0,
        Income: 0
    })

    const handleChange = (e) => {
        let { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value

        if (checked) {
            checked = 1
        } else {
            checked = 0
        }

        setFormData({
            ...formData,
            [name]: newValue,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (response.ok) {
            const json = await response.json()
            if (json.prediction) {
                alert('You may suffer from a heart ailment')
            } else {
                alert('You are currently safe')
            }
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl>
                        <FormLabel>Patient Information</FormLabel>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="HighBP"
                                        checked={formData.HighBP}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="HighBP"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="HighChol"
                                        checked={formData.HighChol}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="HighChol"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="CholCheck"
                                        checked={formData.CholCheck}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="CholCheck"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="BMI"
                                name="BMI"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Smoker"
                                        checked={formData.Smoker}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Smoker"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Stroke"
                                        checked={formData.Stroke}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Stroke"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Diabetes"
                                        checked={formData.Diabetes}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Diabetes"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="PhysActivity"
                                        checked={formData.PhysActivity}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="PhysActivity"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Fruits"
                                        checked={formData.Fruits}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Fruits"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Veggies"
                                        checked={formData.Veggies}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Veggies"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="HvyAlcoholConsump"
                                        checked={formData.HvyAlcoholConsump}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="HvyAlcoholConsump"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="AnyHealthcare"
                                        checked={formData.AnyHealthcare}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="AnyHealthcare"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="NoDocbcCost"
                                        checked={formData.NoDocbcCost}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="NoDocbcCost"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="GenHlth"
                                name="GenHlth"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="MentHlth"
                                name="MentHlth"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="PhysHlth"
                                name="PhysHlth"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="DiffWalk"
                                        checked={formData.DiffWalk}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="DiffWalk"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="Sex"
                                        checked={formData.Sex}
                                        onChange={handleChange}
                                        color="primary"
                                    />
                                }
                                label="Gender (Tick this if you are male)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Age"
                                name="Age"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Education"
                                name="Education"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Income"
                                name="Income"
                                type="number"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </FormControl>
                </FormGroup>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default PatientForm
