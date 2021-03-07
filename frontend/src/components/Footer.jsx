import Typography from '@material-ui/core/Typography';
const footer = {
    "position": "absolute",
    "bottom": "0",
    "width": "100%",
    "height": "2.5rem",
}

export default function Footer() {
    return (
        <div style={footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                CopyRight © 2020 - {new Date().getFullYear()} UBU student.
            </Typography>
        </div>
    )
};